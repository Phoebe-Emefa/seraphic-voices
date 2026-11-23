import { imageSrc } from "../../sanity/sanity-client";
import type { EventDocument } from "@/lib/cms/types";

export type EventDetail = EventDocument;

export function resolveEventImage(event: EventDetail, width?: number) {
  const ref = event.image?.asset?._ref;
  return ref ? imageSrc(ref, width) ?? "" : "";
}
