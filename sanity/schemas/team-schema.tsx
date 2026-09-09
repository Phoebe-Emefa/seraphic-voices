const team = {
  name: "team",
  title: "Team Page",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "Optional. Shown below the member name (e.g. Financial Secretary).",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
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
      name: "category",
      title: "Category",
      type: "string",
    },
  ],
};

export default team;
