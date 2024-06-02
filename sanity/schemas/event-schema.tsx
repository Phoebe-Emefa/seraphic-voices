const events = {
  name: "events",
  title: "Events",
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
      name: "start_date",
      title: "Start Date & Time",
      type: "datetime",
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
    },
    {
      name: "video",
      title: "Event Video (if any)",
      type: "string",
    },
    {
      name: "description",
      title: "Event Description",
      type: "string",
    },
    {
      name: "ticket_url",
      title: "Ticket Url",
      type: "string",
    },
  ],
};

export default events;
