export const altField = {
  name: "alt",
  type: "string" as const,
  title: "Alt text",
  description: "Describe the image for screen readers.",
};

export const requiredAltField = {
  ...altField,
  validation: (Rule: {
    custom: (
      fn: (
        value: unknown,
        context: { parent?: { asset?: unknown } },
      ) => true | string,
    ) => unknown;
  }) =>
    Rule.custom((value, context) => {
      if (!context.parent?.asset) return true;
      if (typeof value === "string" && value.trim()) return true;
      return "Alt text is required when an image is uploaded.";
    }),
};

export const hotspotImageFields = [altField];
