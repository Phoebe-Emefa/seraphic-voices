/** Rich text for the founder copy beside the portrait. */
export const visionContentBlock = {
  type: "block",
  styles: [{ title: "Body", value: "normal" }],
  lists: [],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
    ],
    annotations: [],
  },
};

/** Rich text for the italic approach passage below the founder section. */
export const visionApproachBlock = {
  type: "block",
  styles: [{ title: "Approach", value: "approach" }],
  lists: [],
  marks: {
    decorators: [{ title: "Emphasis", value: "em" }],
    annotations: [],
  },
};
