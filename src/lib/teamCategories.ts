import type { TeamCategoryDocument, TeamMemberDocument } from "@/lib/cms/types";

export type TeamVoiceTab = {
  label: string;
  value: string;
  matchValues: string[];
};

export function resolveTeamVoiceTabs(
  categories?: TeamCategoryDocument[],
): TeamVoiceTab[] {
  return (
    categories
      ?.map((category) => {
        const label = category.label?.trim() ?? "";
        const legacyValue = category.value?.trim();
        const matchValues = Array.from(
          new Set([label, legacyValue].filter((value): value is string => Boolean(value))),
        );

        if (!label) {
          return null;
        }

        return {
          label,
          value: label,
          matchValues,
        };
      })
      .filter((category): category is TeamVoiceTab => category !== null) ?? []
  );
}

export function memberMatchesCategory(
  member: TeamMemberDocument,
  tab: TeamVoiceTab,
): boolean {
  const category = member.category?.trim();
  if (!category) {
    return false;
  }

  return tab.matchValues.includes(category);
}
