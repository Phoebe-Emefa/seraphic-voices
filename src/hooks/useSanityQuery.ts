"use client";

import { SANITY_FETCH_OPTIONS } from "@/lib/cms/cache";
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

export function useSanityQuery<T>(
  queryKey: readonly unknown[],
  groq: string,
  params?: Record<string, unknown>,
) {
  return useQuery({
    queryKey,
    queryFn: () =>
      fetchWithTimeout(
        client.fetch<T>(
          groq,
          (params ?? {}) as Record<string, string>,
          SANITY_FETCH_OPTIONS,
        ),
        QUERY_TIMEOUT_MS,
      ),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
