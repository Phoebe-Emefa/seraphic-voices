import moment from "moment-timezone";

const TZ = "America/Toronto";

export function torontoNow() {
  return moment.tz(TZ);
}

export function eventMoment(date?: string) {
  return date ? moment.tz(date, TZ) : null;
}

export function isUpcomingEvent(event: { start_date?: string; end_date?: string }) {
  const now = torontoNow();
  const end = eventMoment(event.end_date || event.start_date);
  if (!end) return false;
  return end.isSameOrAfter(now);
}

export function isPastEvent(event: { start_date?: string; end_date?: string }) {
  return !isUpcomingEvent(event);
}

type DatedEvent = { start_date?: string; end_date?: string };

function eventSortValue(date: string | undefined, fallback: number) {
  const m = eventMoment(date);
  return m ? m.valueOf() : fallback;
}

/** Nearest upcoming first (e.g. Sept 30 before Oct 5). */
export function compareUpcomingEvents(a: DatedEvent, b: DatedEvent) {
  const aTime = eventSortValue(a.start_date, Number.POSITIVE_INFINITY);
  const bTime = eventSortValue(b.start_date, Number.POSITIVE_INFINITY);
  return aTime - bTime;
}

/** Most recently passed first (uses end date when available). */
export function comparePastEvents(a: DatedEvent, b: DatedEvent) {
  const aTime = eventSortValue(a.end_date || a.start_date, Number.NEGATIVE_INFINITY);
  const bTime = eventSortValue(b.end_date || b.start_date, Number.NEGATIVE_INFINITY);
  return bTime - aTime;
}

export function sortUpcomingEvents<T extends DatedEvent>(events: T[]): T[] {
  return [...events].sort(compareUpcomingEvents);
}

export function sortPastEvents<T extends DatedEvent>(events: T[]): T[] {
  return [...events].sort(comparePastEvents);
}

export function formatEventDate(date?: string) {
  const m = eventMoment(date);
  return m ? m.format("MMMM D, YYYY") : "";
}

export function formatEventTime(date?: string) {
  const m = eventMoment(date);
  return m ? m.format("h:mm A") : "";
}

export function formatEventRange(start?: string, end?: string) {
  const startM = eventMoment(start);
  const endM = eventMoment(end);
  if (!startM) return "";
  if (!endM || startM.isSame(endM, "day")) {
    return `${startM.format("llll")} (Eastern Time)`;
  }
  return `${startM.format("llll")} - ${endM.format("llll")} (Eastern Time)`;
}
