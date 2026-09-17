import type { Metadata } from "next";
import { eventPath } from "@/lib/eventPaths";
import type { EventDocument } from "@/lib/cms/types";

export const SITE_URL = "https://www.seraphicvoicestoronto.com";
export const SITE_NAME = "Seraphic Voices of Toronto";

export const DEFAULT_DESCRIPTION =
  "A non-denominational Toronto choir blending Western and African choral music — gospel, hymns, and contemporary worship that harmonizes cultures and elevates hearts.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/seraphic-voices.png`;

/** Known social profiles — keep in sync with CMS contact page socials. */
export const SOCIAL_PROFILES = [
  "https://www.youtube.com/channel/UCW_aWGQSe4kN9vKA1Hd_qVg",
  "https://www.instagram.com/seraphicvoicesoftoronto",
  "https://web.facebook.com/profile.php?id=100064140482985",
] as const;

export type PageSeoKey =
  | "home"
  | "aboutUs"
  | "ourTeam"
  | "events"
  | "gallery"
  | "contactUs"
  | "donate";

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
};

export const PAGE_SEO: Record<PageSeoKey, PageSeoConfig> = {
  home: {
    title: "Seraphic Voices of Toronto | Gospel & African Choral Choir",
    description:
      "Seraphic Voices of Toronto is a non-denominational gospel and African choral choir in Toronto, Ontario. Discover upcoming concerts, book performances, and experience the fusion of Western and African choral music.",
    path: "/",
  },
  aboutUs: {
    title: "Who We Are",
    description:
      "Learn about Seraphic Voices of Toronto — our mission, story, and vision to harmonize cultures through Western and African choral music in the Greater Toronto Area.",
    path: "/about-us",
  },
  ourTeam: {
    title: "Our Team",
    description:
      "Meet the directors, musicians, and members of Seraphic Voices of Toronto — the people behind our gospel and African choral performances across Toronto.",
    path: "/about-us/our-team",
  },
  events: {
    title: "Upcoming Concerts & Events",
    description:
      "See upcoming and past concerts by Seraphic Voices of Toronto. Find dates, venues, and tickets for gospel and African choral performances in Toronto and beyond.",
    path: "/events",
  },
  gallery: {
    title: "Photo & Video Gallery",
    description:
      "Browse photos and videos from Seraphic Voices of Toronto performances — gospel choir concerts, African choral music, and community events across Toronto.",
    path: "/gallery",
  },
  contactUs: {
    title: "Contact Us",
    description:
      "Contact Seraphic Voices of Toronto for bookings, auditions, collaborations, and general inquiries. Based in the Greater Toronto Area, Ontario.",
    path: "/contact-us",
  },
  donate: {
    title: "Support Us",
    description:
      "Support Seraphic Voices of Toronto with a donation. Help us continue bringing gospel and African choral music to communities across Toronto and beyond.",
    path: "/donate",
  },
};

type BuildPageMetadataInput = {
  /** CMS or custom page title (without site suffix — template adds it). */
  title?: string | null;
  description?: string | null;
  path: string;
  image?: string | null;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: BuildPageMetadataInput): Metadata {
  const config = Object.values(PAGE_SEO).find((page) => page.path === path);
  const resolvedTitle = title?.trim() || config?.title || SITE_NAME;
  const resolvedDescription = description?.trim() || config?.description || DEFAULT_DESCRIPTION;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogImage = image?.trim() || DEFAULT_OG_IMAGE;
  const useAbsoluteTitle = path === "/" || resolvedTitle.includes(SITE_NAME);

  return {
    title: useAbsoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: SITE_NAME,
      locale: "en_CA",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function buildPageMetadataFromConfig(
  key: PageSeoKey,
  overrides?: Partial<BuildPageMetadataInput>,
): Metadata {
  const config = PAGE_SEO[key];
  return buildPageMetadata({
    title: overrides?.title ?? config.title,
    description: overrides?.description ?? config.description,
    path: overrides?.path ?? config.path,
    image: overrides?.image,
    noIndex: overrides?.noIndex,
  });
}

type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_OG_IMAGE,
        description: DEFAULT_DESCRIPTION,
        areaServed: {
          "@type": "City",
          name: "Toronto",
          containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
        },
        genre: ["Gospel", "Choral", "African choral music", "Contemporary worship"],
        sameAs: [...SOCIAL_PROFILES],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-CA",
      },
    ],
  };
}

function portableTextToPlain(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (!Array.isArray(value)) return undefined;
  const text = value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const children = (block as { children?: Array<{ text?: string }> }).children;
      if (!Array.isArray(children)) return "";
      return children.map((child) => child.text ?? "").join("");
    })
    .join(" ")
    .trim();
  return text || undefined;
}

function buildEventSchema(event: EventDocument, path?: string) {
  const url = path ? `${SITE_URL}${path}` : eventPath(event) !== "/events" ? `${SITE_URL}${eventPath(event)}` : undefined;

  return {
    "@type": "Event",
    name: event.title,
    startDate: event.start_date,
    ...(event.end_date ? { endDate: event.end_date } : {}),
    ...(url ? { url } : {}),
    ...(event.location
      ? {
          location: {
            "@type": "Place",
            name: event.location,
            address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON" },
          },
        }
      : {}),
    ...(event.ticket_url ? { offers: { "@type": "Offer", url: event.ticket_url } } : {}),
    organizer: { "@id": `${SITE_URL}/#organization` },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };
}

export function buildEventJsonLd(event: EventDocument, path?: string) {
  if (!event.title || !event.start_date) return null;
  return {
    "@context": "https://schema.org",
    ...buildEventSchema(event, path),
  };
}

export function buildEventsJsonLd(events: EventDocument[]) {
  const eventSchemas = events
    .filter((event) => event.title && event.start_date)
    .slice(0, 10)
    .map((event) => buildEventSchema(event));

  if (!eventSchemas.length) return null;

  return {
    "@context": "https://schema.org",
    "@graph": eventSchemas,
  };
}

export { portableTextToPlain };
