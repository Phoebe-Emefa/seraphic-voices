import { SANITY_FETCH_OPTIONS } from "@/lib/cms/cache";
import { client } from "../../../sanity/sanity-client";

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1500;

function isRetriableSanityError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  if (error.message.includes("fetch failed")) return true;
  if ("isNetworkError" in error && (error as { isNetworkError?: boolean }).isNetworkError) {
    return true;
  }

  const cause = (error as { cause?: { code?: string } }).cause;
  return (
    cause?.code === "UND_ERR_CONNECT_TIMEOUT" ||
    cause?.code === "ETIMEDOUT" ||
    cause?.code === "ECONNRESET"
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await client.fetch<T>(query, params, SANITY_FETCH_OPTIONS);
    } catch (error) {
      const isLastAttempt = attempt === MAX_ATTEMPTS;
      if (!isRetriableSanityError(error) || isLastAttempt) {
        console.error(`[Sanity] Query failed (attempt ${attempt}/${MAX_ATTEMPTS}):`, error);
        return null;
      }

      await wait(RETRY_DELAY_MS * attempt);
    }
  }

  return null;
}
