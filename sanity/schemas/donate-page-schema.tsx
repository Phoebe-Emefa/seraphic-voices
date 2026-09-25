import { requiredAltField } from "./image-fields";
import { isValidCmsHref } from "./validation";

const donatePage = {
  name: "donatePage",
  title: "Donate",
  type: "document",
  description: "Donate page (/donate).",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
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
      name: "content",
      title: "Content",
      type: "object",
      group: "content",
      fieldsets: [
        {
          name: "sectionIntro",
          title: "Section intro",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "impactPanel",
          title: "Impact panel",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "givingInstructions",
          title: "How to give",
          options: { collapsible: true, collapsed: false },
        },
      ],
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          fieldset: "sectionIntro",
          description: "Short label above the intro (for example: Support Our Mission).",
        },
        {
          name: "intro",
          title: "Intro",
          type: "text",
          fieldset: "sectionIntro",
          description: "Short paragraph below the eyebrow.",
        },
        {
          name: "impactTitle",
          title: "Impact heading",
          type: "string",
          fieldset: "impactPanel",
          description: "Heading in the dark impact card.",
        },
        {
          name: "impactBody",
          title: "Impact body",
          type: "text",
          fieldset: "impactPanel",
        },
        {
          name: "ctaLabel",
          title: "CTA button label",
          type: "string",
          fieldset: "impactPanel",
        },
        {
          name: "ctaHref",
          title: "CTA button URL",
          type: "string",
          fieldset: "impactPanel",
          validation: (Rule: {
            custom: (fn: (value: unknown) => true | string) => unknown;
          }) =>
            Rule.custom((value) => {
              if (typeof value !== "string" || !value.trim()) return true;
              if (isValidCmsHref(value)) return true;
              return "Enter an internal path (for example: /contact-us) or a full https:// URL.";
            }),
        },
        {
          name: "instructionsTitle",
          title: "Instructions heading",
          type: "string",
          fieldset: "givingInstructions",
          description: "Heading above the numbered giving steps.",
        },
        {
          name: "instructions",
          title: "Giving steps",
          type: "array",
          fieldset: "givingInstructions",
          description: "Each step appears as a numbered card on the page.",
          of: [
            {
              name: "instruction",
              title: "Step",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Step text",
                  type: "text",
                },
              ],
              preview: {
                select: { text: "text" },
                prepare({ text }: { text?: string }) {
                  return {
                    title: text?.trim() || "Giving step",
                  };
                },
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Donate" };
    },
  },
};

export default donatePage;
