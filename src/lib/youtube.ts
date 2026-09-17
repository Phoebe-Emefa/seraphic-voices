/**
 * Extract a YouTube video ID from common URL formats.
 * Returns null for channel URLs, playlists-only URLs, or invalid input.
 */
export function extractYouTubeId(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);

    // youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id && id.length >= 6 ? id : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      // watch?v=VIDEO_ID
      const vParam = parsed.searchParams.get("v");
      if (vParam) return vParam;

      // embed/VIDEO_ID or shorts/VIDEO_ID or live/VIDEO_ID
      const pathMatch = parsed.pathname.match(/\/(embed|shorts|live|v)\/([^/?]+)/);
      if (pathMatch?.[2]) return pathMatch[2];
    }
  } catch {
    // Fall through to regex for non-URL strings
  }

  const fallbackMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return fallbackMatch?.[1] ?? null;
}

export function buildYouTubeEmbedUrl(
  videoId: string,
  origin?: string,
  options?: { autoplay?: boolean },
) {
  const params = new URLSearchParams({
    autoplay: options?.autoplay === false ? "0" : "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  if (origin) {
    params.set("origin", origin);
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function buildYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export type YouTubeThumbnailQuality = "max" | "hq" | "mq" | "default";

const YOUTUBE_THUMBNAIL_CDN = "https://img.youtube.com";

const YOUTUBE_THUMBNAIL_FILES: Record<YouTubeThumbnailQuality, string> = {
  max: "maxresdefault.jpg",
  hq: "hqdefault.jpg",
  mq: "mqdefault.jpg",
  default: "default.jpg",
};

/** YouTube returns a ~120px-wide JPEG when maxres is unavailable. */
export const YOUTUBE_THUMBNAIL_PLACEHOLDER_MAX_WIDTH = 120;

export function isYouTubeThumbnailPlaceholder(
  img: Pick<HTMLImageElement, "naturalWidth">,
): boolean {
  return img.naturalWidth > 0 && img.naturalWidth <= YOUTUBE_THUMBNAIL_PLACEHOLDER_MAX_WIDTH;
}

/**
 * Card thumbnails: mq first (16:9, exists for virtually all videos).
 * maxres is probed separately — when missing, YouTube often returns a gray
 * 120×90 JPEG on 404 that still paints and breaks naive fallbacks.
 */
export const YOUTUBE_THUMBNAIL_FALLBACK_ORDER: YouTubeThumbnailQuality[] = [
  "mq",
  "hq",
  "default",
];

export function buildYouTubeThumbnailUrl(
  videoId: string,
  quality: YouTubeThumbnailQuality = "hq",
): string {
  return `${YOUTUBE_THUMBNAIL_CDN}/vi/${videoId}/${YOUTUBE_THUMBNAIL_FILES[quality]}`;
}

/** Thumbnail from a pasted YouTube URL (mq, with hq/default fallbacks). */
export function buildYouTubeThumbnailFromUrl(url?: string | null): string | null {
  const videoId = extractYouTubeId(url);
  return videoId ? buildYouTubeThumbnailUrl(videoId, "mq") : null;
}

export function youtubeThumbnailFallback(src: string): string | null {
  const match = src.match(/\/vi\/([^/]+)\/([^/?]+)/);
  if (!match) return null;

  const [, videoId, file] = match;
  const files = YOUTUBE_THUMBNAIL_FALLBACK_ORDER.map((q) => YOUTUBE_THUMBNAIL_FILES[q]);
  const currentIndex = files.indexOf(file);
  if (currentIndex < 0 || currentIndex >= files.length - 1) return null;

  const nextFile = files[currentIndex + 1];
  return `${YOUTUBE_THUMBNAIL_CDN}/vi/${videoId}/${nextFile}`;
}
