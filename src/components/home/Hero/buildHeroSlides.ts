import type { EventDocument, HomePageDocument, SanityImage } from "@/lib/cms/types";
import { cmsHref } from "@/lib/cmsHref";
import { formatEventDate, formatEventTime } from "@/lib/eventDates";
import { resolveEventImage } from "@/lib/eventDisplay";
import { eventPath } from "@/lib/eventPaths";
import { imageSrc } from "../../../../sanity/sanity-client";

export type HeroSlide = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  objectPosition: string;
  title?: string;
  briefTitle?: string;
  metaDate?: string;
  metaLocation?: string;
  ctaTitle?: string;
  ctaHref?: string;
  primaryHeading?: boolean;
};

const DEFAULT_PHOTO_OBJECT_POSITION = "center top";

function resolveImageUrl(image?: SanityImage): string | null {
  if (!image) return null;
  const url = imageSrc(image.asset?._ref ?? image);
  return url || null;
}

export function resolveObjectPosition(image?: SanityImage): string {
  const { hotspot } = image ?? {};
  if (hotspot?.x != null && hotspot?.y != null) {
    return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
  }
  return DEFAULT_PHOTO_OBJECT_POSITION;
}

function resolveEventId(event: EventDocument) {
  return event._id || event._key || "event";
}

export function buildHeroSlides(
  home: HomePageDocument | null,
  featuredEvents: EventDocument[],
  detailsLabel?: string,
): HeroSlide[] {
  const slides: HeroSlide[] = [];

  featuredEvents.forEach((event) => {
    const imageUrl = resolveEventImage(event);
    if (!imageUrl) return;

    const detailsHref = eventPath(event);
    const dateLabel = event.start_date
      ? [formatEventDate(event.start_date), formatEventTime(event.start_date)]
          .filter(Boolean)
          .join(" · ")
      : undefined;

    slides.push({
      id: `event-${event._id || resolveEventId(event)}`,
      imageUrl,
      imageAlt: event.image?.alt || event.title || "",
      objectPosition: resolveObjectPosition(event.image),
      title: event.title,
      metaDate: dateLabel,
      metaLocation: event.location,
      ctaTitle: detailsLabel && detailsHref !== "/events" ? detailsLabel : undefined,
      ctaHref: detailsLabel && detailsHref !== "/events" ? detailsHref : undefined,
    });
  });

  const slideCtaHref = cmsHref(home?.hero?.ctaHref);
  const slidePhotos = home?.hero?.brandPhotos ?? home?.hero?.imageSlider ?? [];

  slidePhotos.forEach((image, index) => {
    const imageUrl = resolveImageUrl(image);
    if (!imageUrl) return;

    slides.push({
      id: `slide-photo-${image.asset?._ref || index}`,
      imageUrl,
      imageAlt: image.alt || home?.hero?.headline || "",
      objectPosition: resolveObjectPosition(image),
      title: home?.hero?.headline,
      briefTitle: home?.hero?.subheadline,
      ctaTitle: home?.hero?.ctaTitle,
      ctaHref: slideCtaHref || undefined,
    });
  });

  if (slides.length > 0) {
    const firstWithTitle = slides.findIndex((slide) => Boolean(slide.title));
    if (firstWithTitle >= 0) {
      slides[firstWithTitle].primaryHeading = true;
    }
  }

  return slides;
}
