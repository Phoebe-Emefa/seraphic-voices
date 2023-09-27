const donation = {
  name: "donation",
  title: "Donation",
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
      name: "donationInstruction",
      title: "Donation Instruction",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};

export default donation;
