import { imageSrc } from "../../../../sanity/sanity-client";
import { formatEventDate } from "@/lib/eventDates";

export type HeroSlide = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  objectPosition: string;
  title?: string;
  description?: string;
  ctaTitle?: string;
  ctaHref?: string;
  event?: any;
};

const DEFAULT_PHOTO_OBJECT_POSITION = "center top";

function resolveImageUrl(image: any): string | null {
  if (!image) return null;
  const url = imageSrc(image.asset?._ref ?? image);
  return url || null;
}

export function resolveObjectPosition(image: any): string {
  const { hotspot } = image ?? {};
  if (hotspot?.x != null && hotspot?.y != null) {
    return `${hotspot.x * 100}% ${hotspot.y * 100}%`;
  }
  return DEFAULT_PHOTO_OBJECT_POSITION;
}

export function buildHeroSlides(content: any, featuredEvent?: any): HeroSlide[] {
  const slides: HeroSlide[] = [];
  const eventImageUrl = resolveImageUrl(featuredEvent?.image);

  if (featuredEvent && eventImageUrl) {
    const eventDate = featuredEvent.start_date ? formatEventDate(featuredEvent.start_date) : "";
    const description = [featuredEvent.location, eventDate].filter(Boolean).join(" · ");
    slides.push({
      id: `event-${featuredEvent.slug?.current || featuredEvent.slug || featuredEvent._id}`,
      imageUrl: eventImageUrl,
      imageAlt: featuredEvent.image?.alt || featuredEvent.title || "Upcoming event",
      objectPosition: resolveObjectPosition(featuredEvent.image),
      title: featuredEvent.title || content?.title,
      description: description || content?.description,
      ctaTitle: "View event",
      event: featuredEvent,
    });
  }

  const brandImages = content?.imageSlider ?? [];
  brandImages.forEach((image: any, index: number) => {
    const imageUrl = resolveImageUrl(image);
    if (!imageUrl || imageUrl === eventImageUrl) return;

    slides.push({
      id: `brand-${image.asset?._ref || index}`,
      imageUrl,
      imageAlt: image.alt || content?.title || "Seraphic Voices",
      objectPosition: resolveObjectPosition(image),
      title: content?.title,
      description: content?.description,
      ctaTitle: "Who we are",
      ctaHref: "/about-us",
    });
  });

  return slides;
}
