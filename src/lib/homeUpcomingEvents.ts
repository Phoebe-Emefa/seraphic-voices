import type { EventDocument } from "@/lib/cms/types";
import { isUpcomingEvent } from "@/lib/eventDates";

export const HOME_UPCOMING_LIMIT = 2;
export const EVENTS_PAGE_PATH = "/events";

export function selectHomeUpcomingEvents(events: EventDocument[]): EventDocument[] {
  return events
    .filter(isUpcomingEvent)
    .sort((a, b) => {
      const aTime = a.start_date ? Date.parse(a.start_date) : Number.POSITIVE_INFINITY;
      const bTime = b.start_date ? Date.parse(b.start_date) : Number.POSITIVE_INFINITY;
      return aTime - bTime;
    })
    .slice(0, HOME_UPCOMING_LIMIT);
}
