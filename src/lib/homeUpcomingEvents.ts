import type { EventDocument } from "@/lib/cms/types";
import { isUpcomingEvent, sortUpcomingEvents } from "@/lib/eventDates";

export const HOME_UPCOMING_LIMIT = 2;
export const EVENTS_PAGE_PATH = "/events";

export function selectHomeUpcomingEvents(events: EventDocument[]): EventDocument[] {
  return sortUpcomingEvents(events.filter(isUpcomingEvent)).slice(0, HOME_UPCOMING_LIMIT);
}
