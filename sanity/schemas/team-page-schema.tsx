import { requiredAltField } from "./image-fields";
import {
  teamCategoryFields,
  teamCategoryPreview,
  teamCategoryValidation,
} from "./team-category-fields";
import {
  teamMemberFields,
  teamMemberPreview,
  teamMemberValidation,
} from "./team-member-fields";

const teamPage = {
  name: "teamPage",
  title: "Our Team",
  type: "document",
  description: "Our Team page (/about-us/our-team).",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "listing", title: "Members" },
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
      name: "listing",
      title: "Members",
      type: "object",
      group: "listing",
      fieldsets: [
        {
          name: "memberCategories",
          title: "Voice / role categories",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "memberList",
          title: "Team members",
          options: { collapsible: true, collapsed: false },
        },
      ],
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Short label above the intro (for example: The Voices).",
        },
        {
          name: "intro",
          title: "Intro",
          type: "text",
          description: "Short paragraph above the voice tabs.",
        },
        {
          name: "categories",
          title: "Categories",
          type: "array",
          fieldset: "memberCategories",
          description:
            "Tabs shown on the page. Add categories here first — members pick from this list when you add them.",
          validation: (Rule: {
            custom: (fn: (value: unknown) => true | string) => unknown;
          }) =>
            Rule.custom((value) => {
              const items = Array.isArray(value) ? value : [];
              const labels = items
                .map((item) =>
                  typeof item === "object" && item && "label" in item
                    ? String((item as { label?: string }).label ?? "").trim()
                    : "",
                )
                .filter(Boolean);

              const unique = new Set(labels.map((label) => label.toLowerCase()));
              if (unique.size !== labels.length) {
                return "Each category label must be unique.";
              }

              return true;
            }),
          of: [
            {
              name: "category",
              title: "Category",
              type: "object",
              fields: teamCategoryFields,
              preview: teamCategoryPreview,
              validation: teamCategoryValidation,
            },
          ],
        },
        {
          name: "members",
          title: "Members",
          type: "array",
          fieldset: "memberList",
          description:
            "Add each member and choose their category from the dropdown.",
          of: [
            {
              name: "member",
              title: "Member",
              type: "object",
              fields: teamMemberFields,
              preview: teamMemberPreview,
              validation: teamMemberValidation,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Our Team" };
    },
  },
};

export default teamPage;
