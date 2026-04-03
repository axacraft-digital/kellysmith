#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findRepoRoot(startDir) {
  let current = startDir;

  while (true) {
    const hasPackageJson = fs.existsSync(path.join(current, "package.json"));
    const hasAppDir = fs.existsSync(path.join(current, "src", "app"));

    if (hasPackageJson && hasAppDir) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error("Could not locate repo root from current path.");
    }

    current = parent;
  }
}

const repoRoot = findRepoRoot(__dirname);

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function walkFiles(dir, extensions) {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, extensions));
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }

  return results;
}

function toRepoRelative(fullPath) {
  return path.relative(repoRoot, fullPath).replaceAll(path.sep, "/");
}

function lineNumberForIndex(text, index) {
  return text.slice(0, index).split("\n").length;
}

function discoverRoutes() {
  const appDir = path.join(repoRoot, "src", "app");
  const pageFiles = walkFiles(appDir, new Set([".tsx", ".jsx"]));
  return pageFiles
    .filter((f) => /\/page\.(tsx|jsx)$/.test(f))
    .map((f) => {
      const rel = path.relative(appDir, f).replace(/\/page\.(tsx|jsx)$/, "");
      return rel === "" ? "/" : `/${rel}`;
    });
}

function addFinding(findings, severity, message, file = null, line = null) {
  findings.push({ severity, message, file, line });
}

function auditMetadata(findings) {
  const layoutPath = "src/app/layout.tsx";
  const layoutText = readText(layoutPath);

  // If layout uses buildMetadata helper, metadata is handled centrally — skip inline checks
  const usesBuildMetadata = /buildMetadata\s*\(/.test(layoutText);

  if (!usesBuildMetadata) {
    if (!/metadataBase\s*:\s*new URL\(/.test(layoutText) && !/metadataBase/.test(layoutText)) {
      addFinding(findings, "High", "Root metadata is missing `metadataBase`.", layoutPath);
    }

    if (!/openGraph\s*:/.test(layoutText)) {
      addFinding(findings, "High", "Root layout is missing Open Graph metadata.", layoutPath);
    }

    if (!/twitter\s*:/.test(layoutText)) {
      addFinding(
        findings,
        "Medium",
        "Root layout has no Twitter card metadata. Social metadata is only partially configured.",
        layoutPath
      );
    }

    if (!/alternates\s*:/.test(layoutText)) {
      addFinding(
        findings,
        "Medium",
        "Root layout does not define canonical URL handling through `alternates` metadata.",
        layoutPath
      );
    }
  }

  const routes = discoverRoutes();

  for (const route of routes) {
    const routeFile =
      route === "/"
        ? "src/app/page.tsx"
        : `src/app${route}/page.tsx`;

    if (!exists(routeFile)) continue;

    const text = readText(routeFile);
    const hasMetadataExport =
      /export\s+const\s+metadata\s*[=:]/.test(text) ||
      /export\s+async\s+function\s+generateMetadata/.test(text) ||
      /buildMetadata\s*\(/.test(text);

    if (!hasMetadataExport) {
      addFinding(
        findings,
        "Medium",
        `Route ${route} does not define route-level metadata.`,
        routeFile
      );
    }
  }
}

function auditSitemap(findings) {
  const hasSitemapTs = exists("src/app/sitemap.ts") || exists("src/app/sitemap.tsx");
  const hasNextSitemapConfig = exists("next-sitemap.config.js");

  if (!hasSitemapTs && !hasNextSitemapConfig) {
    addFinding(findings, "High", "No sitemap generation found (neither `src/app/sitemap.ts` nor `next-sitemap.config.js`).");
  }

  const hasRobots = exists("src/app/robots.ts") || exists("src/app/robots.tsx") || exists("public/robots.txt");
  if (!hasRobots) {
    addFinding(findings, "High", "No robots.txt generation found.");
  }
}

function auditImages(findings) {
  const sourceFiles = walkFiles(path.join(repoRoot, "src"), new Set([".tsx", ".jsx"]));

  for (const fullPath of sourceFiles) {
    const text = fs.readFileSync(fullPath, "utf8");
    const relativePath = toRepoRelative(fullPath);

    for (const match of text.matchAll(/<Image\b[\s\S]*?>/g)) {
      const snippet = match[0];
      const index = match.index ?? 0;
      const line = lineNumberForIndex(text, index);

      if (!/\balt=/.test(snippet)) {
        addFinding(findings, "High", "`next/image` usage is missing an `alt` attribute.", relativePath, line);
        continue;
      }

      if (/\balt="\s*"/.test(snippet)) {
        addFinding(
          findings,
          "Low",
          "Decorative image uses empty alt text. Confirm this image is truly decorative.",
          relativePath,
          line
        );
      }

      if (!/\bsizes=/.test(snippet) && /\bfill\b/.test(snippet)) {
        addFinding(
          findings,
          "Medium",
          "Fill image is missing a `sizes` attribute, which can lead to oversized downloads.",
          relativePath,
          line
        );
      }
    }

    for (const match of text.matchAll(/<img\b[\s\S]*?>/g)) {
      const line = lineNumberForIndex(text, match.index ?? 0);
      addFinding(
        findings,
        "High",
        "Raw `<img>` tag found. Prefer `next/image` unless there is a deliberate exception.",
        relativePath,
        line
      );
    }
  }

  const publicImages = walkFiles(path.join(repoRoot, "public"), new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]));
  for (const fullPath of publicImages) {
    const relativePath = toRepoRelative(fullPath);
    const stat = fs.statSync(fullPath);
    const fileSizeKb = Math.round(stat.size / 1024);
    const baseName = path.basename(fullPath);

    if (!/^[a-z0-9][a-z0-9-]*\.(avif|jpe?g|png|webp)$/i.test(baseName)) {
      addFinding(
        findings,
        "Low",
        `Image filename is not clean lowercase kebab-case: ${baseName}`,
        relativePath
      );
    }

    if (fileSizeKb >= 1024) {
      addFinding(
        findings,
        "High",
        `Image asset is oversized (${fileSizeKb} KB). Consider resizing, recompressing, or converting to AVIF/WebP.`,
        relativePath
      );
    } else if (fileSizeKb >= 400) {
      addFinding(
        findings,
        "Medium",
        `Image asset is relatively heavy (${fileSizeKb} KB). Review whether a smaller source file is possible.`,
        relativePath
      );
    }
  }
}

function auditHeadings(findings) {
  const pageFiles = walkFiles(path.join(repoRoot, "src", "app"), new Set([".tsx", ".jsx"]));

  for (const fullPath of pageFiles) {
    const relativePath = toRepoRelative(fullPath);
    if (!/\/page\.(tsx|jsx)$/.test(relativePath)) {
      continue;
    }

    const text = fs.readFileSync(fullPath, "utf8");
    const h1Matches = [...text.matchAll(/<h1\b/g)];

    if (h1Matches.length === 0 && !/<Hero\b/.test(text)) {
      addFinding(
        findings,
        "Medium",
        "Page template has no visible `h1` and no obvious hero abstraction that may provide one.",
        relativePath
      );
    }

    if (h1Matches.length > 1) {
      addFinding(findings, "High", "Page template contains more than one `h1`.", relativePath);
    }
  }
}

function auditStructuredData(findings) {
  let hasJsonLd = false;
  const allSourceFiles = walkFiles(path.join(repoRoot, "src"), new Set([".tsx", ".jsx"]));
  for (const fullPath of allSourceFiles) {
    const text = fs.readFileSync(fullPath, "utf8");
    if (/application\/ld\+json/.test(text) || /<JsonLd\b/.test(text)) {
      hasJsonLd = true;
      break;
    }
  }

  if (!hasJsonLd) {
    addFinding(findings, "Medium", "No JSON-LD structured data found anywhere in the site.");
  }

  const allSrcFiles = walkFiles(path.join(repoRoot, "src"), new Set([".tsx", ".jsx", ".ts"]));
  const hasWebSite = allSrcFiles.some((f) => /WebSite/.test(fs.readFileSync(f, "utf8")));
  if (!hasWebSite) {
    addFinding(findings, "Low", "No WebSite schema found. Consider adding it for site-level identity.");
  }
}

function formatFinding(finding) {
  const location = finding.file
    ? finding.line
      ? ` (${finding.file}:${finding.line})`
      : ` (${finding.file})`
    : "";

  return `- ${finding.message}${location}`;
}

function main() {
  const findings = [];

  auditMetadata(findings);
  auditSitemap(findings);
  auditImages(findings);
  auditHeadings(findings);
  auditStructuredData(findings);

  const routes = discoverRoutes();

  const buckets = {
    High: findings.filter((item) => item.severity === "High"),
    Medium: findings.filter((item) => item.severity === "Medium"),
    Low: findings.filter((item) => item.severity === "Low"),
  };

  console.log(`# Technical SEO + A11y Audit`);
  console.log("");
  console.log(`Repo: ${repoRoot}`);
  console.log(`Discovered routes: ${routes.length} (${routes.join(", ")})`);
  console.log(`Total findings: ${findings.length}`);
  console.log("");

  for (const severity of ["High", "Medium", "Low"]) {
    console.log(`## ${severity}`);
    const bucket = buckets[severity];
    if (bucket.length === 0) {
      console.log("");
      console.log("- None.");
      console.log("");
      continue;
    }

    console.log("");
    for (const finding of bucket) {
      console.log(formatFinding(finding));
    }
    console.log("");
  }
}

main();
