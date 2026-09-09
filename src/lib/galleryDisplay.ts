import { imageSrc } from "../../sanity/sanity-client";

export type GalleryImage = {
  _id?: string;
  url: string;
  alt: string;
  caption?: string;
  albumKey: string;
};

export type GalleryAlbum = {
  key: string;
  label: string;
  date?: string;
  description?: string;
  year?: number;
  images: GalleryImage[];
};

export type CmsGalleryAlbumRef = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  date?: string;
  description?: string;
};

export type CmsGalleryItem = {
  _id?: string;
  category?: string;
  caption?: string;
  image?: { asset?: { _ref?: string }; alt?: string };
  album?: CmsGalleryAlbumRef | null;
};

const LEGACY_CATEGORY_LABELS: Record<string, string> = {
  concerts: "Concerts & Performances",
  rehearsals: "Rehearsals",
  community: "Community & Outreach",
  seasonal: "Seasonal Highlights",
};

export function legacyCategoryLabel(category: string): string {
  return LEGACY_CATEGORY_LABELS[category] || category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function resolveGalleryImageUrl(item: CmsGalleryItem): string {
  const ref = item.image?.asset?._ref;
  return ref ? imageSrc(ref) || "" : "";
}

export function resolveAlbumKeyFromItem(item: CmsGalleryItem): string {
  if (item.album?.slug?.current) return item.album.slug.current;
  if (item.album?._id) return item.album._id;
  if (item.album?.title) {
    return item.album.title.toLowerCase().replace(/\s+/g, "-");
  }
  if (item.category) return item.category;
  return "uncategorized";
}

export function resolveAlbumMetaFromItem(item: CmsGalleryItem): {
  key: string;
  label: string;
  date?: string;
  description?: string;
} {
  if (item.album?.title) {
    return {
      key: resolveAlbumKeyFromItem(item),
      label: item.album.title,
      date: item.album.date,
      description: item.album.description,
    };
  }

  const key = item.category || "uncategorized";
  return {
    key,
    label: key === "uncategorized" ? "Gallery" : legacyCategoryLabel(key),
  };
}

export function mapCmsToGalleryImage(item: CmsGalleryItem): GalleryImage | null {
  const url = resolveGalleryImageUrl(item);
  if (!url) return null;

  const albumKey = resolveAlbumKeyFromItem(item);

  return {
    _id: item._id,
    url,
    alt: item.image?.alt || item.caption || "Seraphic Voices gallery image",
    caption: item.caption,
    albumKey,
  };
}

export function albumYear(date?: string): number | undefined {
  if (!date) return undefined;
  const year = new Date(date).getFullYear();
  return Number.isNaN(year) ? undefined : year;
}

export function formatAlbumDate(date?: string): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
}
