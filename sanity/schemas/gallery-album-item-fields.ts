import { requiredAltField } from "./image-fields";
import {
  galleryPhotoFields,
  galleryPhotoPreview,
  galleryPhotoValidation,
} from "./gallery-photo-fields";

type GalleryAlbumValue = {
  title?: string;
  cover?: { asset?: unknown; alt?: string };
  photos?: unknown[];
};

export const galleryAlbumItemFields = [
  {
    name: "title",
    title: "Album title",
    type: "string",
    description: "Shown on the album tab (for example: Christmas Carols).",
  },
  {
    name: "cover",
    title: "Album cover",
    type: "image",
    options: { hotspot: true },
    description: "Required. Shown as the large featured image for this album.",
    fields: [requiredAltField],
  },
  {
    name: "photos",
    title: "Photos",
    type: "array",
    description: "Add each photo for the grid below the cover.",
    of: [
      {
        name: "photo",
        title: "Photo",
        type: "object",
        fields: galleryPhotoFields,
        preview: galleryPhotoPreview,
        validation: galleryPhotoValidation,
      },
    ],
  },
];

export const galleryAlbumItemPreview = {
  select: {
    title: "title",
    cover: "cover",
  },
  prepare({ title, cover }: { title?: string; cover?: unknown }) {
    return {
      title: title?.trim() || "Album",
      media: cover,
    };
  },
};

export const galleryAlbumItemValidation = (Rule: {
  custom: (fn: (value: GalleryAlbumValue | undefined) => true | string) => unknown;
}) =>
  Rule.custom((value: GalleryAlbumValue | undefined) => {
    const title = value?.title?.trim();
    const photos = Array.isArray(value?.photos) ? value.photos : [];
    const hasCover = Boolean(value?.cover?.asset);

    if (!title && !hasCover && photos.length === 0) {
      return true;
    }

    if (!title) {
      return "Add an album title.";
    }

    if (!hasCover) {
      return "Add an album cover image.";
    }

    if (!value?.cover?.alt?.trim()) {
      return "Add alt text for the album cover.";
    }

    return true;
  });
