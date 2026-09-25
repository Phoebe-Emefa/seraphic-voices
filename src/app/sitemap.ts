import type { MetadataRoute } from "next";
import { getEventsRouteData } from "@/lib/cms/fetchPages";
import { eventPath } from "@/lib/eventPaths";
import { PAGE_SEO, SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages = Object.values(PAGE_SEO).map((page) => ({
    url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.path === "/" ? "weekly" as const : "monthly" as const,
    priority: page.path === "/" ? 1 : 0.8,
  }));

  let eventPages: MetadataRoute.Sitemap = [];
  try {
    const { events } = await getEventsRouteData();
    eventPages = events.flatMap((event) => {
      const path = eventPath(event);
      if (path === "/events") return [];
      return [{
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }];
    });
  } catch {
    eventPages = [];
  }

  return [...staticPages, ...eventPages];
}
