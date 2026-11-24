import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.kellysmith.com",
      lastModified: new Date("2026-05-21"),
    },
    {
      url: "https://www.kellysmith.com/porsche",
      lastModified: new Date("2025-06-01"),
    },
  ];
}
