import { TeamCategorySelect } from "../components/TeamCategorySelect";
import { requiredAltField } from "./image-fields";
import { teamCategoryIdsFromDocument } from "./team-category-fields";

type TeamMemberValue = {
  name?: string;
  role?: string;
  category?: string;
  image?: { asset?: unknown; alt?: string };
};

type ValidationContext = {
  document?: {
    listing?: { categories?: Array<{ label?: string; value?: string }> };
  };
  parent?: TeamMemberValue;
};

export const teamMemberFields = [
  {
    name: "name",
    title: "Name",
    type: "string",
  },
  {
    name: "role",
    title: "Role / title",
    type: "string",
    description: "Optional. Shown below the name (for example: Financial Secretary).",
  },
  {
    name: "category",
    title: "Category",
    type: "string",
    description: "Choose a voice / role tab from the categories defined above.",
    components: {
      input: TeamCategorySelect,
    },
  },
  {
    name: "image",
    title: "Photo",
    type: "image",
    options: { hotspot: true },
    fields: [requiredAltField],
  },
];

export const teamMemberPreview = {
  select: {
    name: "name",
    role: "role",
    category: "category",
    media: "image",
  },
  prepare({
    name,
    role,
    category,
    media,
  }: {
    name?: string;
    role?: string;
    category?: string;
    media?: unknown;
  }) {
    return {
      title: name || "Team member",
      subtitle: [category, role].filter(Boolean).join(" · ") || "No category",
      media,
    };
  },
};

export const teamMemberValidation = (Rule: {
  custom: (
    fn: (value: TeamMemberValue | undefined, context: ValidationContext) => true | string,
  ) => unknown;
}) =>
  Rule.custom((value: TeamMemberValue | undefined, context: ValidationContext) => {
    const name = value?.name?.trim();
    const category = value?.category?.trim();
    const hasImage = Boolean(value?.image?.asset);
    const validCategories = teamCategoryIdsFromDocument(context.document);

    if (!name && !category && !hasImage) {
      return true;
    }

    if (!name) {
      return "Add a name for this team member.";
    }

    if (!category) {
      return "Choose a voice / role group from the category list.";
    }

    if (validCategories.size > 0 && !validCategories.has(category)) {
      return "Choose a category from the list defined above.";
    }

    if (hasImage && !value?.image?.alt?.trim()) {
      return "Add alt text for the member photo.";
    }

    return true;
  });
