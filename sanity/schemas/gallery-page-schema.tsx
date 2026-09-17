import { requiredAltField } from "./image-fields";

const galleryPage = {
  name: "galleryPage",
  title: "Gallery",
  type: "document",
  description: "Gallery page (/gallery).",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "listing", title: "Albums" },
  ],
  fields: [
    {
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [requiredAltField],
        },
      ],
    },
    {
      name: "listing",
      title: "Albums",
      type: "object",
      group: "listing",
      fieldsets: [
        {
          name: "albumIntro",
          title: "Section intro",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "albumList",
          title: "Albums",
          options: { collapsible: true, collapsed: false },
        },
      ],
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          fieldset: "albumIntro",
          description: "Short label above the intro (for example: In Pictures).",
        },
        {
          name: "intro",
          title: "Intro",
          type: "text",
          fieldset: "albumIntro",
          description: "Short paragraph above the album tabs.",
        },
        {
          name: "albums",
          title: "Albums",
          type: "array",
          fieldset: "albumList",
          description: "Each album becomes a tab on the gallery page.",
          of: [{ type: "galleryAlbumItem" }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Gallery" };
    },
  },
};

export default galleryPage;
