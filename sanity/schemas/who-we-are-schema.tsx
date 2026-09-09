const whoWeAre = {
  name: "whoWeAre",
  title: "Who We Are Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Story Title",
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
      title: "Story Paragraph 1",
      type: "text",
    },
    {
      name: "description_2",
      title: "Story Paragraph 2",
      type: "text",
    },
    {
      name: "description_3",
      title: "Story Paragraph 3",
      type: "text",
    },
    {
      name: "image",
      type: "image",
      title: "Story Image (primary)",
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
      name: "story_images",
      title: "Story Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
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
      name: "founder_name",
      title: "Founder Name",
      type: "string",
    },
    {
      name: "founder_title",
      title: "Founder Title",
      type: "string",
    },
    {
      name: "founder_image",
      type: "image",
      title: "Founder Image",
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
      name: "vision_paragraph_1",
      title: "Vision Paragraph 1",
      type: "text",
    },
    {
      name: "vision_paragraph_2",
      title: "Vision Paragraph 2",
      type: "text",
    },
    {
      name: "approach_paragraph",
      title: "Approach Paragraph",
      type: "text",
    },
    {
      name: "mission",
      title: "Mission Statement",
      type: "text",
    },
    {
      name: "faith",
      title: "Faith Pillar",
      type: "text",
    },
    {
      name: "heritage",
      title: "Heritage Pillar",
      type: "text",
    },
    {
      name: "excellence",
      title: "Excellence Pillar",
      type: "text",
    },
    {
      name: "closing_belief",
      title: "Closing Belief",
      type: "text",
    },
    {
      name: "vision",
      title: "Vision (legacy)",
      type: "string",
    },
  ],
};

export default whoWeAre;
