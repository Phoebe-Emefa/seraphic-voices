const galleryAlbum = {
  name: "galleryAlbum",
  title: "Gallery Album",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Album title",
      type: "string",
      description: "e.g. Christmas Carols, Easter Fest, An African Christmas",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "date",
      title: "Event date",
      type: "date",
      description: "Used for sorting and year grouping on the gallery page",
    },
    {
      name: "description",
      title: "Short description",
      type: "string",
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "coverImage",
    },
    prepare({
      title,
      date,
      media,
    }: {
      title?: string;
      date?: string;
      media?: any;
    }) {
      return {
        title,
        subtitle: date ? new Date(date).getFullYear().toString() : undefined,
        media,
      };
    },
  },
};

export default galleryAlbum;
