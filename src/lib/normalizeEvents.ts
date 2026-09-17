import type { EventDocument, EventPageDocument } from "@/lib/cms/types";

type EventListItem = EventDocument & { _key?: string };

/** Array items use _key; the UI expects a stable _id for keys and hero slides. */
export function normalizeEventItems(items?: EventListItem[] | null): EventDocument[] {
  if (!items?.length) return [];
  return items.map((item) => ({
    ...item,
    _id: item._id ?? item._key,
  }));
}

export function eventsFromPage(page: EventPageDocument | null): EventDocument[] {
  return normalizeEventItems(page?.listing?.items);
}
