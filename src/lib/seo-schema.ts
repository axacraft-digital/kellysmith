import { ventures } from "@/lib/data";
import { siteMetadataBase, siteName } from "@/lib/metadata";

type SchemaValue = Record<string, unknown>;

interface BreadcrumbItemInput {
  name: string;
  path: string;
}

const siteUrl = siteMetadataBase.toString().replace(/\/$/, "");

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

function orgId(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${siteUrl}/#org-${slug}`;
}

export function buildWebSiteSchema(): SchemaValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": PERSON_ID },
  };
}

export function buildPersonSchema(): SchemaValue {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteName,
    url: siteUrl,
    image: `${siteUrl}/kelly-avatar.png`,
    jobTitle: "Entrepreneur & Product Leader",
    description:
      "Entrepreneur, product leader, and technologist based in Boise, Idaho. " +
      "Former Head of Digital/Technology at Starbucks, Athletic Greens/AG1, " +
      "MGM Resorts, and Hagerty, and the developer of Teligant — the first " +
      "AI-native telehealth system.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boise",
      addressRegion: "ID",
      addressCountry: "US",
    },
    knowsAbout: [
      "Telehealth software",
      "AI-native healthcare",
      "Product leadership",
      "Digital transformation",
      "Startup incubation",
      "Venture investing",
      "Classic Porsche collecting",
    ],
    worksFor: ventures.map((v) => ({ "@id": orgId(v.name) })),
    sameAs: [
      "https://linkedin.com/in/kellysmith",
      "https://x.com/curiousoffice",
      "https://instagram.com/curiousoffice",
    ],
  };
}

export function buildOrganizationSchemas(): SchemaValue[] {
  return ventures.map((v) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(v.name),
    name: v.name,
    url: v.url,
    description: v.description,
    founder: { "@id": PERSON_ID },
  }));
}

export function buildProfilePageSchema(): SchemaValue {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${siteName} — Entrepreneur & Product Leader`,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItemInput[]): SchemaValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: new URL(item.path, siteMetadataBase).toString(),
      name: item.name,
      position: index + 1,
    })),
  };
}
