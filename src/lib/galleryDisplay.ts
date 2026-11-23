export type GalleryImage = {
  _id?: string;
  url: string;
  fullUrl?: string;
  alt: string;
  caption?: string;
  albumKey: string;
};

export type GalleryAlbum = {
  key: string;
  label: string;
  cover: GalleryImage;
  images: GalleryImage[];
};
