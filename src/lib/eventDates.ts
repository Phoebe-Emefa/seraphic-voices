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
