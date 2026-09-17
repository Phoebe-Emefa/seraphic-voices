import { requiredAltField } from "./image-fields";

type GalleryPhotoValue = {
  caption?: string;
  image?: { asset?: unknown; alt?: string };
};

export const galleryPhotoFields = [
  {
    name: "image",
    title: "Photo",
    type: "image",
    options: { hotspot: true },
    fields: [requiredAltField],
  },
  {
    name: "caption",
    title: "Caption",
    type: "string",
    description: "Optional. Shown in the lightbox.",
  },
];

export const galleryPhotoPreview = {
  select: {
    caption: "caption",
    alt: "image.alt",
    media: "image",
  },
  prepare({
    caption,
    alt,
    media,
  }: {
    caption?: string;
    alt?: string;
    media?: unknown;
  }) {
    return {
      title: caption || alt || "Photo",
      media,
    };
  },
};

export const galleryPhotoValidation = (Rule: {
  custom: (fn: (value: GalleryPhotoValue | undefined) => true | string) => unknown;
}) =>
  Rule.custom((value: GalleryPhotoValue | undefined) => {
    const hasImage = Boolean(value?.image?.asset);
    const caption = value?.caption?.trim();

    if (!hasImage && !caption) {
      return true;
    }

    if (!hasImage) {
      return "Upload a photo.";
    }

    if (!value?.image?.alt?.trim()) {
      return "Add alt text for the photo.";
    }

    return true;
  });
