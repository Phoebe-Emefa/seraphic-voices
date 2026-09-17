import { httpsUrl } from "@/lib/httpsUrl";

/** Internal path or https URL from CMS. Rejects javascript: and other schemes. */
export function cmsHref(href?: string | null): string | null {
  if (!href || typeof href !== "string") return null;
  const trimmed = href.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }
  return httpsUrl(trimmed);
}
