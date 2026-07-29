import type { MetadataRoute } from "next";
import { pages, site, subPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // `subPages` are deliberately absent from the nav, but they're still public
  // pages and should be crawlable — omitting them here would hide them from
  // search entirely, which isn't the same as keeping them out of the nav.
  const routes = [...pages, ...subPages];

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...routes.map((page) => ({
      url: `${site.url}${page.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
