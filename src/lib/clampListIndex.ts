/** Keeps a list index in range when CMS-driven arrays shrink or reorder. */
export function clampListIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  if (!Number.isFinite(index) || index < 0) return 0;
  return Math.min(index, length - 1);
}
