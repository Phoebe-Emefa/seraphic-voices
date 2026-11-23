import { SANITY_SERVER_FETCH_OPTIONS } from "@/lib/cms/cache";
import { isRetriableSanityError, sanityErrorMessage } from "@/lib/cms/sanityErrors";
import { client } from "../../../sanity/sanity-client";

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1500;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await client.fetch<T>(query, params, SANITY_SERVER_FETCH_OPTIONS);
    } catch (error) {
      const isLastAttempt = attempt === MAX_ATTEMPTS;
      if (!isRetriableSanityError(error) || isLastAttempt) {
        console.error(
          `[Sanity] Query failed (attempt ${attempt}/${MAX_ATTEMPTS}): ${sanityErrorMessage(error)}`,
        );
        throw error;
      }

      await wait(RETRY_DELAY_MS * attempt);
    }
  }

  throw new Error("Sanity query failed");
}
