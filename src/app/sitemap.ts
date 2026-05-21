import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kellysmith.com",
      lastModified: new Date("2026-05-21"),
    },
    {
      url: "https://kellysmith.com/porsche",
      lastModified: new Date("2025-06-01"),
    },
  ];
}
