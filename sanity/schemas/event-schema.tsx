const events = {
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: any) => Rule.required().error('Slug is required'),

    },
    {
      name: "start_date",
      title: "Start Date & Time (Canadian Time)",
      type: "datetime",
      description: "Enter the date and time in Canadian Eastern Time (Toronto timezone)",
      validation: (Rule: any) => Rule.required().error('Start Date and Time is required'),
    },
    {
      name: "end_date",
      title: "End Date & Time (Canadian Time)",
      type: "datetime",
      description: "Enter the date and time in Canadian Eastern Time (Toronto timezone)",
      validation: (Rule: any) => Rule.required().error('End Date and Time is required'),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule: any) => Rule.required().error('Location is required'),

    },

    {
      name: "image",
      title: "Event Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
      validation: (Rule: any) => Rule.required().error('Event Image is required'),

    },

    {
      name: "description",
      title: "Event Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule: any) => Rule.required().error('Description is required'),
    },
    {
      name: "video",
      title: "Event Video (if any)",
      type: "string",
    },
    {
      name: "ticket_url",
      title: "Ticket Url (if any)",
      type: "string",
    },
  ],
};

export default events;
