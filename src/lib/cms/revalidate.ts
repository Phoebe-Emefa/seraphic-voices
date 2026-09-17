import { revalidatePath, revalidateTag } from "next/cache";
import { SANITY_CACHE_TAG, SANITY_TYPE_TAGS } from "@/lib/cms/cache";

export type SanityWebhookDocument = {
  _type?: string;
  _id?: string;
};

/** Map Sanity document types to site paths that should refresh after publish. */
export function pathsForSanityDocument(_type: string): string[] {
  switch (_type) {
    case "home":
      return ["/"];
    case "event":
    case "eventsPage":
      return ["/", "/events"];
    case "galleryPage":
      return ["/gallery"];
    case "whoWeAre":
      return ["/about-us"];
    case "teamPage":
      return ["/about-us/our-team"];
    case "contactPage":
      return ["/contact-us"];
    case "donatePage":
      return ["/donate"];
    default:
      return [];
  }
}

export function revalidateSanityDocument(document: SanityWebhookDocument) {
  const type = document._type;
  const revalidated: { tags: string[]; paths: string[] } = {
    tags: [SANITY_CACHE_TAG],
    paths: [],
  };

  revalidateTag(SANITY_CACHE_TAG);

  if (type) {
    const typeTag = SANITY_TYPE_TAGS[type as keyof typeof SANITY_TYPE_TAGS];
    if (typeTag) {
      revalidateTag(typeTag);
      revalidated.tags.push(typeTag);
    }

    const paths = pathsForSanityDocument(type);
    for (const path of paths) {
      revalidatePath(path);
      revalidated.paths.push(path);
    }
  }

  return revalidated;
}
