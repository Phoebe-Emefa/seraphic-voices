import {
  DUMMY_PAST_EVENTS,
  DUMMY_UPCOMING_EVENTS,
} from "@/data/dummyEvents";
import { isUpcomingEvent } from "@/lib/eventDates";
import type { EventDetail } from "@/lib/eventDisplay";

/**
 * Resolves events for the events page. Falls back to dummy data when CMS is
 * empty, or when CMS has no upcoming events (so the layout can be previewed).
 */
export function resolveEvents(cms?: EventDetail[]): EventDetail[] {
  const source = cms && cms.length > 0 ? cms : [];

  if (source.length === 0) {
    return [...DUMMY_UPCOMING_EVENTS, ...DUMMY_PAST_EVENTS] as EventDetail[];
  }

  const hasUpcoming = source.some(isUpcomingEvent);
  if (!hasUpcoming) {
    return [...DUMMY_UPCOMING_EVENTS, ...source] as EventDetail[];
  }

  return source;
}

/** Home section: real upcoming events, or two dummies for layout preview. */
export function resolveHomeUpcomingEvents(cms?: EventDetail[]): EventDetail[] {
  const source = cms && cms.length > 0 ? cms : [];
  const upcoming = source.filter(isUpcomingEvent);

  if (upcoming.length > 0) {
    return upcoming;
  }

  return DUMMY_UPCOMING_EVENTS.slice(0, 2) as EventDetail[];
}
