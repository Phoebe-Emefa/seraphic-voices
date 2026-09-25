import {
  galleryAlbumItemFields,
  galleryAlbumItemPreview,
  galleryAlbumItemValidation,
} from "./gallery-album-item-fields";

const galleryAlbumItem = {
  name: "galleryAlbumItem",
  title: "Album",
  type: "object",
  fields: galleryAlbumItemFields,
  preview: galleryAlbumItemPreview,
  validation: galleryAlbumItemValidation,
};

export default galleryAlbumItem;
