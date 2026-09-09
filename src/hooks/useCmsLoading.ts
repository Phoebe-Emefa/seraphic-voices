"use client";

import type { UseQueryResult } from "@tanstack/react-query";

export function isCmsLoading(query: Pick<UseQueryResult, "isPending" | "isError">) {
  return query.isPending && !query.isError;
}

export function isAnyCmsLoading(
  ...queries: Array<Pick<UseQueryResult, "isPending" | "isError">>
) {
  return queries.some((query) => isCmsLoading(query));
}
