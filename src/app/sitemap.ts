import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.seraphicvoicestoronto.com";
  const paths = [
    "",
    "/about-us",
    "/about-us/our-team",
    "/events",
    "/gallery",
    "/donate",
    "/contact-us",
  ];
  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
