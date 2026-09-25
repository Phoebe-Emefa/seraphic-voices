/** Rich text for Our Story block body copy. */
export const storyContentBlock = {
  type: "block",
  styles: [
    { title: "Body", value: "normal" },
    { title: "Lead", value: "lead" },
    { title: "Intro", value: "intro" },
  ],
  lists: [],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
    ],
    annotations: [],
  },
};

/** Rich text for closing taglines (image-left block only). */
export const storyTaglineBlock = {
  type: "block",
  styles: [{ title: "Tagline", value: "tagline" }],
  lists: [],
  marks: {
    decorators: [{ title: "Emphasis", value: "em" }],
    annotations: [],
  },
};
