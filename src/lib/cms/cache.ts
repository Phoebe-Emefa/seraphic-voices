/** Global Sanity cache tag — used by publish webhooks when on-demand revalidation is enabled. */
export const SANITY_CACHE_TAG = "sanity";

/** Next.js fetch cache for server-only `sanityFetch`. Do not pass this from the browser. */
export const SANITY_SERVER_FETCH_OPTIONS = {
  next: {
    revalidate: 60,
    tags: [SANITY_CACHE_TAG],
  },
};

/**
 * Shared Next.js route segment config for CMS-backed pages.
 * Literals must be copied into the layout file; Next.js does not accept imported values.
 */
export const CMS_ROUTE_SEGMENT_CONFIG = {
  revalidate: 60,
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
