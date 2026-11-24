import { siteMetadataBase, siteName } from "@/lib/metadata";

type SchemaValue = Record<string, unknown>;

interface BreadcrumbItemInput {
  name: string;
  path: string;
}

const siteUrl = siteMetadataBase.toString().replace(/\/$/, "");

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;
const DARIA_PERSON_ID = "https://www.axacraft.com/#person-daria-smith";

const organizations: {
  id: string;
  name: string;
  url: string;
  cofounder: boolean;
}[] = [
  {
    id: "https://www.curiousoffice.com/#organization",
    name: "Curious Office",
    url: "https://www.curiousoffice.com",
    cofounder: false,
  },
  {
    id: "https://www.teligant.com/#organization",
    name: "Teligant",
    url: "https://www.teligant.com",
    cofounder: true,
  },
  {
    id: "https://www.hedfirst.com/#organization",
    name: "Hedfirst",
    url: "https://www.hedfirst.com",
    cofounder: true,
  },
  {
    id: "https://www.axacraft.com/#organization",
    name: "Axacraft",
    url: "https://www.axacraft.com",
    cofounder: true,
  },
  {
    id: "https://www.zeitcore.com/#organization",
    name: "Zeitcore",
    url: "https://www.zeitcore.com",
    cofounder: true,
  },
  {
    id: "https://pitform.com/#organization",
    name: "Pitform",
    url: "https://pitform.com",
    cofounder: true,
  },
];

function founderRefs(includeDaria: boolean) {
  const kelly = { "@id": PERSON_ID };
  if (!includeDaria) return kelly;
  return [kelly, { "@id": DARIA_PERSON_ID }];
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
      "Entrepreneur, product leader, and technologist based in Meridian, Idaho. " +
      "Former Vice President of Global Digital Products at Starbucks, Senior Vice President " +
      "and Chief Digital Officer at MGM Resorts, Chief Digital Officer and Chief Information " +
      "Officer at Hagerty, and Chief Digital Officer at Athletic Greens (AG1).",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Meridian",
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
    worksFor: organizations.map((org) => ({ "@id": org.id })),
    sameAs: [
      "https://www.linkedin.com/in/kellysmith/",
      "https://x.com/curiousoffice",
      "https://www.instagram.com/curiousoffice",
      "https://www.geekwire.com/tag/kelly-smith/",
    ],
  };
}

export function buildOrganizationSchemas(): SchemaValue[] {
  return organizations.map((org) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": org.id,
    name: org.name,
    url: org.url,
    founder: founderRefs(org.cofounder),
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
