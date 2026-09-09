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
