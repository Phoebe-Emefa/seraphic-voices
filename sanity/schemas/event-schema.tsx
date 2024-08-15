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
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule: any) => Rule.required().error('Start Date and Time is required'),

    },
    {
      name: "end_date",
      title: "End Date & Time",
      type: "datetime",
      validation: (Rule: any) => Rule.required().error('End Date and Time is required'),

    },
    // {
    //   name: "end_date",
    //   title: "End Date & Time",
    //   type: "datetime",
    // },
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
      type: "string",
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
