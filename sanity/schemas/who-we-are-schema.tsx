import { requiredAltField } from "./image-fields";
import {
  storyBlockFields,
  storyBlockPreview,
  storyBlockValidation,
} from "./story-block-fields";
import { visionApproachBlock, visionContentBlock } from "./vision-rich-text";

const whoWeAre = {
  name: "whoWeAre",
  title: "Who We Are",
  type: "document",
  description: "Who We Are page (/about-us).",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "vision", title: "Vision" },
    { name: "mission", title: "Mission" },
    { name: "belief", title: "Belief" },
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
      name: "story",
      title: "Story",
      type: "object",
      group: "story",
      fields: [
        {
          name: "title",
          title: "Section title",
          type: "string",
        },
        {
          name: "blocks",
          title: "Story blocks",
          type: "array",
          description:
            "Each block is a designed section on the page. Use Text+image (right) for the opening, Full width for the middle passage, and Image+text (left) for the closing.",
          of: [
            {
              name: "storyBlock",
              title: "Story block",
              type: "object",
              fields: storyBlockFields,
              preview: storyBlockPreview,
              validation: storyBlockValidation,
            },
          ],
        },
      ],
    },
    {
      name: "vision",
      title: "Vision",
      type: "object",
      group: "vision",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        },
        {
          name: "founderName",
          title: "Founder name",
          type: "string",
        },
        {
          name: "founderTitle",
          title: "Founder title",
          type: "string",
        },
        {
          name: "founderImage",
          title: "Founder image",
          type: "image",
          options: { hotspot: true },
          fields: [requiredAltField],
        },
        {
          name: "content",
          title: "Founder story",
          type: "array",
          description: "Body copy shown beside the founder portrait.",
          of: [visionContentBlock],
        },
        {
          name: "approachPassage",
          title: "Approach",
          type: "array",
          description: "Italic passage below the founder section (after the gold line).",
          of: [visionApproachBlock],
        },
      ],
    },
    {
      name: "mission",
      title: "Mission",
      type: "object",
      group: "mission",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        },
        {
          name: "statement",
          title: "Mission statement",
          type: "text",
        },
        {
          name: "pillars",
          title: "Pillars",
          type: "array",
          description: "Add 3 pillars when this section is ready (Faith, Heritage, Excellence).",
          validation: (Rule: {
            custom: (fn: (value: unknown) => true | string) => unknown;
          }) =>
            Rule.custom((value) => {
              const items = Array.isArray(value) ? value : [];
              if (items.length === 0) return true;
              if (items.length === 3) return true;
              if (items.length < 3) {
                const remaining = 3 - items.length;
                return `${items.length} of 3 pillars — add ${remaining} more to publish.`;
              }
              const extra = items.length - 3;
              return `${items.length} of 3 pillars — remove ${extra} to publish.`;
            }),
          of: [
            {
              name: "pillar",
              title: "Pillar",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "body",
                  title: "Body",
                  type: "text",
                },
              ],
              preview: {
                select: { title: "title" },
                prepare({ title }: { title?: string }) {
                  return { title: title || "Pillar" };
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "belief",
      title: "Belief",
      type: "object",
      group: "belief",
      fields: [
        {
          name: "text",
          title: "Closing belief",
          type: "text",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Who We Are" };
    },
  },
};

export default whoWeAre;
