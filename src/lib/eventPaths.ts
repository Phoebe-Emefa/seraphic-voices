import type { EventDocument } from "@/lib/cms/types";

type EventSlugSource = Pick<EventDocument, "slug" | "title">;

/** Mirrors Sanity slugify — used when no stored slug exists. */
export function slugifyEventTitle(title?: string): string {
  return (title ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function storedSlug(slug?: EventDocument["slug"]): string {
  if (!slug) return "";
  return typeof slug === "string" ? slug.trim() : slug.current?.trim() || "";
}

/** Prefer a stored slug; otherwise derive from the concert title. */
export function resolveEventSlug(event: EventSlugSource): string {
  const explicit = storedSlug(event.slug);
  if (explicit) return explicit;
  return slugifyEventTitle(event.title);
}

export function eventPath(event: EventSlugSource): string {
  const slug = resolveEventSlug(event);
  return slug ? `/events/${slug}` : "/events";
}

export function findEventBySlug(events: EventDocument[], slug: string): EventDocument | undefined {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return undefined;
  return events.find((event) => resolveEventSlug(event).toLowerCase() === normalized);
}

export function eventSlugs(events: EventDocument[]): string[] {
  const seen = new Set<string>();
  const slugs: string[] = [];

  for (const event of events) {
    const slug = resolveEventSlug(event);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
  }

  return slugs;
}
