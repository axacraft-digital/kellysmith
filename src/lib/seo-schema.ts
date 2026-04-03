import { siteMetadataBase, siteName } from "@/lib/metadata";

type SchemaValue = Record<string, unknown>;

interface BreadcrumbItemInput {
  name: string;
  path: string;
}

const siteUrl = siteMetadataBase.toString().replace(/\/$/, "");

export function buildWebSiteSchema(): SchemaValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
  };
}

export function buildPersonSchema(): SchemaValue {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteName,
    url: siteUrl,
    jobTitle: "Entrepreneur & Product Leader",
    sameAs: [
      "https://linkedin.com/in/kellysmith",
      "https://x.com/curiousoffice",
      "https://instagram.com/curiousoffice",
    ],
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
