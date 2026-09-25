/** Global Sanity cache tag — used by publish webhooks when on-demand revalidation is enabled. */
export const SANITY_CACHE_TAG = "sanity";

/** Always fetch fresh CMS data (server + client). */
export const SANITY_FETCH_OPTIONS = {
  cache: "no-store" as const,
};

/**
 * Shared Next.js route segment config for CMS-backed pages.
 * Applied once in the root layout so every route stays dynamic.
 */
export const CMS_ROUTE_SEGMENT_CONFIG = {
  dynamic: "force-dynamic" as const,
  revalidate: 0,
};

export const SANITY_TYPE_TAGS = {
  home: "sanity:home",
  event: "sanity:event",
  galleryPage: "sanity:gallery",
  whoWeAre: "sanity:whoWeAre",
  teamPage: "sanity:team",
  contactPage: "sanity:contact",
  donatePage: "sanity:donate",
} as const;
