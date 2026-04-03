import type { Metadata } from "next";

const SITE_URL = "https://kellysmith.com";
const SITE_NAME = "Kelly Smith";
const LOCALE = "en_US";

type MetadataTitle = NonNullable<Metadata["title"]>;
type OpenGraphType = "website" | "article";

interface MetadataImageInput {
  alt?: string;
  url: string;
}

interface BuildMetadataInput {
  description: string;
  image?: MetadataImageInput;
  path?: string;
  title: MetadataTitle;
  type?: OpenGraphType;
}

export const siteMetadataBase = new URL(SITE_URL);
export const siteName = SITE_NAME;

function normalizePath(path = "/") {
  if (!path || path === "/") return "/";

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function toAbsoluteUrl(path = "/") {
  return new URL(normalizePath(path), siteMetadataBase).toString();
}

function resolveSocialTitle(title: MetadataTitle) {
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && title.default) return title.default;
  return SITE_NAME;
}

export function buildMetadata({
  description,
  image,
  path = "/",
  title,
  type = "website",
}: BuildMetadataInput): Metadata {
  const canonicalPath = normalizePath(path);
  const absoluteUrl = toAbsoluteUrl(canonicalPath);
  const socialTitle = resolveSocialTitle(title);

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description,
    metadataBase: siteMetadataBase,
    openGraph: {
      description,
      images: image
        ? [
            {
              alt: image.alt,
              url: image.url,
            },
          ]
        : undefined,
      locale: LOCALE,
      siteName: SITE_NAME,
      title: socialTitle,
      type,
      url: absoluteUrl,
    },
    title,
    twitter: {
      card: image ? "summary_large_image" : "summary",
      description,
      images: image ? [image.url] : undefined,
      title: socialTitle,
    },
  };
}
