type TeamCategoryValue = {
  label?: string;
  /** @deprecated Legacy field — matching falls back to this when present in saved data. */
  value?: string;
};

export const teamCategoryFields = [
  {
    name: "label",
    title: "Tab label",
    type: "string",
    description: "Shown on the filter tab (for example: Soprano or Choir Conductor).",
  },
];

export const teamCategoryPreview = {
  select: {
    label: "label",
  },
  prepare({ label }: { label?: string }) {
    return {
      title: label?.trim() || "Category",
    };
  },
};

export const teamCategoryValidation = (Rule: {
  custom: (fn: (value: TeamCategoryValue | undefined) => true | string) => unknown;
}) =>
  Rule.custom((value: TeamCategoryValue | undefined) => {
    if (!value || typeof value !== "object") {
      return true;
    }

    const label = value.label?.trim();
    const legacyValue = value.value?.trim();

    if (!label && !legacyValue) {
      return true;
    }

    if (!label) {
      return "Add a tab label for this category.";
    }

    return true;
  });

function categoryLabelsFromDocument(document?: {
  listing?: { categories?: TeamCategoryValue[] };
}) {
  const raw = document?.listing?.categories;
  const categories = Array.isArray(raw) ? raw : [];

  return categories
    .map((category) => category?.label?.trim())
    .filter((label): label is string => Boolean(label));
}

export function teamCategoryIdsFromDocument(document?: {
  listing?: { categories?: TeamCategoryValue[] };
}) {
  return new Set(categoryLabelsFromDocument(document));
}
