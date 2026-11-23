"use client";

import { isNonRetriableSanityError } from "@/lib/cms/sanityErrors";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../sanity/sanity-client";

const QUERY_TIMEOUT_MS = 15_000;

async function fetchWithTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Sanity request timed out")), ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

type UseSanityQueryOptions = {
  throwOnError?: boolean;
};

export function useSanityQuery<T>(
  queryKey: readonly unknown[],
  groq: string,
  params?: Record<string, unknown>,
  options?: UseSanityQueryOptions,
) {
  return useQuery({
    queryKey,
    queryFn: () =>
      fetchWithTimeout(
        client.fetch<T>(groq, (params ?? {}) as Record<string, string>),
        QUERY_TIMEOUT_MS,
      ),
    throwOnError: options?.throwOnError ?? true,
    retry: (failureCount, error) => {
      if (isNonRetriableSanityError(error)) return false;
      return failureCount < 2;
    },
  });
}
