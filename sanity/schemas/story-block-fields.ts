import { requiredAltField } from "./image-fields";
import { storyContentBlock, storyTaglineBlock } from "./story-rich-text";

const STORY_LAYOUTS = [
  { title: "Text left, image right", value: "textImage" },
  { title: "Full width text", value: "fullWidth" },
  { title: "Image left, text right", value: "imageText" },
] as const;

type StoryBlockValue = {
  layout?: string;
  content?: unknown[];
  image?: { asset?: unknown; alt?: string };
  taglines?: unknown[];
};

function hasPortableContent(content?: unknown[]) {
  return Array.isArray(content) && content.length > 0;
}

function hasImageAsset(image?: { asset?: unknown }) {
  return Boolean(image?.asset);
}

export const storyBlockFields = [
  {
    name: "layout",
    title: "Layout",
    type: "string",
    options: {
      list: [...STORY_LAYOUTS],
      layout: "radio",
    },
  },
  {
    name: "content",
    title: "Content",
    type: "array",
    description:
      "Body = standard paragraphs. Lead = large opening line. Intro = medium emphasis.",
    of: [storyContentBlock],
  },
  {
    name: "image",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    fields: [requiredAltField],
    description: "One image for this block (not used on full-width blocks).",
    hidden: ({ parent }: { parent?: StoryBlockValue }) => parent?.layout === "fullWidth",
  },
  {
    name: "taglines",
    title: "Closing taglines",
    type: "array",
    description: "Short italic lines shown below the gold rule (image-left block only).",
    of: [storyTaglineBlock],
    hidden: ({ parent }: { parent?: StoryBlockValue }) => parent?.layout !== "imageText",
  },
];

export const storyBlockValidation = (Rule: {
  custom: (fn: (value: StoryBlockValue | undefined) => true | string) => unknown;
}) =>
  Rule.custom((value: StoryBlockValue | undefined) => {
    const layout = value?.layout;
    if (!layout) {
      return "Choose a layout for this story block.";
    }

    if (!hasPortableContent(value?.content)) {
      return "Add content for this story block.";
    }

    if (layout !== "fullWidth" && !hasImageAsset(value?.image)) {
      return "Upload an image for this layout.";
    }

    if (
      layout !== "fullWidth" &&
      hasImageAsset(value?.image) &&
      !value?.image?.alt?.trim()
    ) {
      return "Add alt text for the image.";
    }

    return true;
  });

export const storyBlockPreview = {
  select: {
    layout: "layout",
    text: "content.0.children.0.text",
  },
  prepare({ layout, text }: { layout?: string; text?: string }) {
    const label =
      STORY_LAYOUTS.find((item) => item.value === layout)?.title ?? "Story block";
    return {
      title: label,
      subtitle: text || "No content yet",
    };
  },
};
