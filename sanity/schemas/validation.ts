import { extractYouTubeId } from "@/lib/youtube";

type RuleLike = {
  required: () => RuleLike;
  min: (n: number) => RuleLike;
  max: (n: number) => RuleLike;
  error: (message: string) => RuleLike;
  custom: (fn: (value: unknown, context: { document?: Record<string, unknown>; parent?: Record<string, unknown> }) => true | string) => RuleLike;
};

export const YOUTUBE_VIDEO_URL_DESCRIPTION = `How to get the link:
1. Open the video on YouTube (app or youtube.com).
2. Tap or click Share.
3. Tap or click Copy link.
4. Paste the full link here — do not edit it.

Valid examples:
• https://youtu.be/VIDEO_ID
• https://www.youtube.com/watch?v=VIDEO_ID
• https://www.youtube.com/live/VIDEO_ID?si=...

Do not use your channel page, a playlist, or Copy embed code.`;

export const YOUTUBE_VIDEO_URL_INVALID =
  "Paste a YouTube video link from Share → Copy link (watch, youtu.be, or live/ links). Channel and playlist links will not play.";

export function requiredString(message: string) {
  return (Rule: RuleLike) => Rule.required().error(message);
}

export function isFeaturedInContext(context: {
  document?: Record<string, unknown>;
  parent?: Record<string, unknown>;
}): boolean {
  const item = context.parent ?? context.document;
  return item?.featured === true;
}

export function whenFeatured(message: string) {
  return (Rule: RuleLike) =>
    Rule.custom((value, context) => {
      if (!isFeaturedInContext(context)) return true;
      if (typeof value === "string" && value.trim()) return true;
      if (value) return true;
      return message;
    });
}

/** Warn when featured is on but the concert has already ended (Toronto end-of-day). */
export function featuredMustBeUpcoming() {
  return (Rule: RuleLike) =>
    Rule.custom((value, context) => {
      if (!value) return true;
      const item = context.parent ?? context.document;
      const endRaw = (item?.end_date || item?.start_date) as string | undefined;
      if (!endRaw) return true;
      const endMs = Date.parse(endRaw);
      if (Number.isNaN(endMs)) return true;
      if (endMs < Date.now()) {
        return "This concert has ended and will not appear on the home hero. Turn off Featured or update the dates.";
      }
      return true;
    });
}

function isYouTubeChannelUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    if (!parsed.hostname.includes("youtube.com")) return false;
    const path = parsed.pathname;
    return (
      path.startsWith("/@") ||
      path.startsWith("/channel/") ||
      path.startsWith("/c/") ||
      path.startsWith("/user/")
    );
  } catch {
    return false;
  }
}

export function requiredYouTubeVideoUrl(message: string) {
  return (Rule: RuleLike) =>
    Rule.custom((value) => {
      if (typeof value !== "string" || !value.trim()) return message;
      if (!extractYouTubeId(value)) return YOUTUBE_VIDEO_URL_INVALID;
      return true;
    });
}

export function optionalYouTubeVideoUrl(invalidMessage = YOUTUBE_VIDEO_URL_INVALID) {
  return (Rule: RuleLike) =>
    Rule.custom((value) => {
      if (value === undefined || value === null) return true;
      if (typeof value !== "string" || !value.trim()) return true;
      if (!extractYouTubeId(value)) return invalidMessage;
      return true;
    });
}

export function requiredYouTubeChannelUrl(message: string) {
  return (Rule: RuleLike) =>
    Rule.custom((value) => {
      if (typeof value !== "string" || !value.trim()) return message;
      if (isYouTubeChannelUrl(value)) return true;
      return "Use your YouTube channel link — for example https://www.youtube.com/@YourChannel";
    });
}

/** Matches src/lib/cmsHref.ts — internal paths or https/http URLs. */
export function isValidCmsHref(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function requiredCmsHref(
  requiredMessage: string,
  invalidMessage = "Enter an internal path (for example: /about-us) or a full https:// URL.",
) {
  return (Rule: RuleLike) =>
    Rule.custom((value) => {
      if (typeof value !== "string" || !value.trim()) return requiredMessage;
      if (isValidCmsHref(value)) return true;
      return invalidMessage;
    });
}

export function requiredValidUrl(
  requiredMessage: string,
  invalidMessage = "Enter a valid URL starting with https://",
) {
  return (Rule: RuleLike) =>
    Rule.custom((value) => {
      if (typeof value !== "string" || !value.trim()) return requiredMessage;
      if (!isValidCmsHref(value)) return invalidMessage;
      return true;
    });
}

/** Require a value only when a sibling/parent section is partially filled in. */
export function requiredWhenSectionStarted(
  message: string,
  isStarted: (section: Record<string, unknown> | undefined) => boolean,
) {
  return (Rule: RuleLike) =>
    Rule.custom((value, context) => {
      const section = context.parent as Record<string, unknown> | undefined;
      if (!isStarted(section)) return true;
      if (typeof value === "string" && value.trim()) return true;
      if (value) return true;
      return message;
    });
}

export const HOME_REPERTOIRE_PERFORMANCE_COUNT = 3;

/** Clear array-length errors for Studio (shown on the list, not inside each item). */
export function exactlyArrayCount(count: number, itemLabel: string) {
  return (Rule: RuleLike) =>
    Rule.custom((value) => {
      const items = Array.isArray(value) ? value : [];
      const added = items.length;

      if (added === count) return true;

      if (added < count) {
        const remaining = count - added;
        const performanceWord = remaining === 1 ? itemLabel : `${itemLabel}s`;
        return `${added} of ${count} added — add ${remaining} more ${performanceWord} to publish.`;
      }

      const extra = added - count;
      const performanceWord = extra === 1 ? itemLabel : `${itemLabel}s`;
      return `${added} of ${count} added — remove ${extra} ${performanceWord} to publish.`;
    });
}
