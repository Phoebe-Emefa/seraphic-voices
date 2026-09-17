import { Select, Stack, Text } from "@sanity/ui";
import { set, unset, type StringInputProps, useFormValue } from "sanity";

type TeamCategory = {
  label?: string;
};

function categoryOptions(categories: unknown) {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .map((category) => {
      if (!category || typeof category !== "object") {
        return null;
      }

      const label = (category as TeamCategory).label?.trim();
      if (!label) {
        return null;
      }

      return {
        title: label,
        value: label,
      };
    })
    .filter((option): option is { title: string; value: string } => Boolean(option));
}

export function TeamCategorySelect(props: StringInputProps) {
  const categories = useFormValue(["listing", "categories"]);
  const options = categoryOptions(categories);

  if (options.length === 0) {
    return (
      <Stack space={3}>
        <Text size={1} muted>
          Add voice / role categories in the list above first, then choose one here.
        </Text>
      </Stack>
    );
  }

  return (
    <Stack space={3}>
      <Select
        value={typeof props.value === "string" ? props.value : ""}
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          props.onChange(nextValue ? set(nextValue) : unset());
        }}
      >
        <option value="">Select a category</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </Select>
    </Stack>
  );
}
