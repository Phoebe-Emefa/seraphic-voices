const whoWeAre = {
  name: "whoWeAre",
  title: "Who We Are Page",
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
      name: "description_1",
      title: "Paragraph 1",
      type: "string",
    },
      {
      name: "description_2",
      title: "Paragraph 2",
      type: "string",
    },
      {
      name: "description_3",
      title: "Paragraph 3",
      type: "string",
    },

    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt",
        },
      ],
    },
    {
      name: "vision",
      title: "Vision",
      type: "string",
    },
    {
      name: "mission",
      title: "Mission",
      type: "string",
    },
  ],
};

export default whoWeAre;
