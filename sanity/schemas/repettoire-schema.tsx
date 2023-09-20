const repettoire = {
  name: "repettoire",
  title: "Repettoire",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "url",
      title: "Embeded Youtube Url",
      type: "string",
    },

    {
      name: "image",
      title: "Video Thumbnail",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
  ],
};

export default repettoire;
