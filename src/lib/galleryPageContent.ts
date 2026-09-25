import type {
  GalleryAlbumDocument,
  GalleryPageDocument,
  GalleryPhotoDocument,
} from "@/lib/cms/types";
import type { GalleryAlbum, GalleryImage } from "@/lib/galleryDisplay";
import { imageSrc } from "../../sanity/sanity-client";

export type GalleryHeroContent = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type GalleryListingContent = {
  eyebrow: string;
  intro: string;
  albums: GalleryAlbum[];
};

function resolveAlbumKey(album: GalleryAlbumDocument, index: number): string {
  const title = album.title?.trim();
  if (title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return `album-${index}`;
}

function mapPhotoToGalleryImage(
  photo: GalleryPhotoDocument,
  albumKey: string,
  index: number,
): GalleryImage | null {
  const url = imageSrc(photo.image);
  if (!url) return null;

  return {
    _id: photo._key || `${albumKey}-photo-${index}`,
    url,
    alt: photo.image?.alt || photo.caption || "Seraphic Voices gallery image",
    caption: photo.caption,
    albumKey,
  };
}

function mapAlbumToGalleryAlbum(album: GalleryAlbumDocument, index: number): GalleryAlbum | null {
  const title = album.title?.trim();
  if (!title) return null;

  const key = resolveAlbumKey(album, index);
  const images =
    album.photos
      ?.map((photo, photoIndex) => mapPhotoToGalleryImage(photo, key, photoIndex))
      .filter((photo): photo is GalleryImage => Boolean(photo)) ?? [];

  const coverSource = album.cover ?? album.coverImage ?? album.photos?.[0]?.image;
  const coverUrl = imageSrc(coverSource);

  if (!coverUrl && images.length === 0) {
    return null;
  }

  const cover: GalleryImage = coverUrl
    ? {
        _id: `${key}-cover`,
        url: coverUrl,
        alt:
          album.cover?.alt ||
          album.coverImage?.alt ||
          album.photos?.[0]?.image?.alt ||
          title,
        albumKey: key,
      }
    : images[0];

  return {
    key,
    label: title,
    cover,
    images,
  };
}

export function normalizeGalleryPageData(page?: GalleryPageDocument | null) {
  return { page: page ?? null };
}

export function resolveGalleryHero(page?: GalleryPageDocument | null): GalleryHeroContent | null {
  const hero = page?.hero;
  const title = hero?.title?.trim();
  const description = hero?.description?.trim();
  const imageUrl = imageSrc(hero?.image);

  if (!title && !description && !imageUrl) {
    return null;
  }

  return {
    title: title ?? "",
    description: description ?? "",
    imageUrl,
    imageAlt: hero?.image?.alt,
  };
}

export function resolveGalleryListing(page?: GalleryPageDocument | null): GalleryListingContent | null {
  const listing = page?.listing;
  const eyebrow = listing?.eyebrow?.trim();
  const intro = listing?.intro?.trim();
  const albums =
    listing?.albums
      ?.map((album, index) => mapAlbumToGalleryAlbum(album, index))
      .filter((album): album is GalleryAlbum => Boolean(album)) ?? [];

  if (!eyebrow && !intro && albums.length === 0) {
    return null;
  }

  return {
    eyebrow: eyebrow ?? "",
    intro: intro ?? "",
    albums,
  };
}
