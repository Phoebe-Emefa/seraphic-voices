"use client";

import type { UseQueryResult } from "@tanstack/react-query";

type CmsQueryState = Pick<UseQueryResult, "isPending" | "isError">;

export function isCmsLoading(query: CmsQueryState) {
  return query.isPending && !query.isError;
}

export function isAnyCmsLoading(...queries: CmsQueryState[]) {
  return queries.some((query) => isCmsLoading(query));
}
