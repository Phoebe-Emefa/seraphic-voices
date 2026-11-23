export function sanityErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  return "Unknown error";
}

export function isNonRetriableSanityError(error: unknown): boolean {
  const msg = sanityErrorMessage(error).toLowerCase();
  return (
    msg.includes("plan_limit_reached") ||
    msg.includes("quota") ||
    msg.includes("unauthorized") ||
    msg.includes("forbidden") ||
    msg.includes("401") ||
    msg.includes("403")
  );
}

export function isRetriableSanityError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  if (isNonRetriableSanityError(error)) return false;
  if (error.message.includes("fetch failed")) return true;
  if (error.message.includes("timed out")) return true;
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
