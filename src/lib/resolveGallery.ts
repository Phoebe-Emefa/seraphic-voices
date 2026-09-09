import { DUMMY_GALLERY_ALBUMS } from "@/data/dummyGallery";
import type { CmsGalleryItem, GalleryAlbum, GalleryImage } from "@/lib/galleryDisplay";
import {
  albumYear,
  mapCmsToGalleryImage,
  resolveAlbumKeyFromItem,
  resolveAlbumMetaFromItem,
} from "@/lib/galleryDisplay";

type AlbumBuilder = {
  key: string;
  label: string;
  date?: string;
  description?: string;
  images: GalleryImage[];
};

function compareAlbums(a: AlbumBuilder, b: AlbumBuilder): number {
  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;
  if (dateB !== dateA) return dateB - dateA;
  return a.label.localeCompare(b.label);
}

function groupCmsIntoAlbums(cms: CmsGalleryItem[]): GalleryAlbum[] {
  const map = new Map<string, AlbumBuilder>();
  const assigned = cms.filter(
    (item) =>
      Boolean(item.album?.title) ||
      Boolean(item.album?.slug?.current) ||
      Boolean(item.album?._id),
  );

  for (const item of assigned) {
    const image = mapCmsToGalleryImage(item);
    if (!image) continue;

    const key = resolveAlbumKeyFromItem(item);
    const meta = resolveAlbumMetaFromItem(item);
    const existing = map.get(key);

    if (existing) {
      existing.images.push(image);
      if (meta.date && !existing.date) existing.date = meta.date;
      if (meta.description && !existing.description) existing.description = meta.description;
      continue;
    }

    map.set(key, {
      key,
      label: meta.label,
      date: meta.date,
      description: meta.description,
      images: [image],
    });
  }

  return Array.from(map.values())
    .sort(compareAlbums)
    .map((album) => ({
      ...album,
      year: albumYear(album.date),
    }));
}

function cmsHasAlbumAssignments(cms: CmsGalleryItem[]): boolean {
  return cms.some(
    (item) =>
      Boolean(item.album?.title) ||
      Boolean(item.album?.slug?.current) ||
      Boolean(item.album?._id),
  );
}

/**
 * Resolves gallery albums for the gallery page. Uses dummy event albums when CMS
 * is empty, or when photos exist but none are linked to a galleryAlbum yet
 * (so the layout can be previewed before Sanity is configured).
 */
export function resolveGalleryAlbums(cms?: CmsGalleryItem[]): GalleryAlbum[] {
  const source = cms?.filter((item) => item?.image?.asset?._ref) ?? [];

  if (source.length === 0 || !cmsHasAlbumAssignments(source)) {
    return DUMMY_GALLERY_ALBUMS;
  }

  const albums = groupCmsIntoAlbums(source);
  return albums.length > 0 ? albums : DUMMY_GALLERY_ALBUMS;
}

/** @deprecated Use resolveGalleryAlbums */
export function resolveGalleryCollections(cms?: CmsGalleryItem[]): GalleryAlbum[] {
  return resolveGalleryAlbums(cms);
}
