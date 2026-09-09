import { imageSrc } from "../../sanity/sanity-client";

export type EventDetail = {
  _id?: string;
  title?: string;
  slug?: { current?: string } | string;
  start_date?: string;
  end_date?: string;
  location?: string;
  image?: { asset?: { _ref?: string }; alt?: string };
  imageUrl?: string;
  description?: unknown[] | string;
  video?: string;
  ticket_url?: string;
};

export function resolveEventSlug(slug?: { current?: string } | string) {
  if (!slug) return "";
  return typeof slug === "string" ? slug : slug.current || "";
}

export function resolveEventImage(event: EventDetail) {
  if (event.imageUrl) return event.imageUrl;
  const ref = event.image?.asset?._ref;
  return ref ? imageSrc(ref) : "";
}

export function eventPageHref(event: EventDetail) {
  const slug = resolveEventSlug(event.slug);
  return slug ? `/events/${slug}` : "/events";
}
