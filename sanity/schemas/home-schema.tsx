const home = {
  name: "home",
  title: "Home Page",
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
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "imageSlider",
      title: "Image Slider",
      type: "array",
      of: [
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
      ],
    },
      {
      name: "about_description",
      title: "About Description",
      type: "string",
    },
      {
          name: "about_image",
          type: "image",
          title: "About Image",
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
 
  ],
};

export default home;
