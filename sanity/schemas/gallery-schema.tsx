const gallery = {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "album",
      title: "Album",
      type: "reference",
      to: [{ type: "galleryAlbum" }],
      description: "The event or album this photo belongs to",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "category",
      title: "Legacy collection (deprecated)",
      type: "string",
      description: "Deprecated — use Album instead. Kept for older entries.",
      options: {
        list: [
          { title: "Concerts", value: "concerts" },
          { title: "Rehearsals", value: "rehearsals" },
          { title: "Community", value: "community" },
          { title: "Seasonal", value: "seasonal" },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: "caption",
      albumTitle: "album.title",
      media: "image",
    },
    prepare({
      title,
      albumTitle,
      media,
    }: {
      title?: string;
      albumTitle?: string;
      media?: any;
    }) {
      return {
        title: title || albumTitle || "Gallery image",
        subtitle: albumTitle,
        media,
      };
    },
  },
};

export default gallery;
