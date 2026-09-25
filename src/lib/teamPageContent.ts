import type { TeamMemberDocument, TeamPageDocument } from "@/lib/cms/types";
import { resolveTeamVoiceTabs, type TeamVoiceTab } from "@/lib/teamCategories";
import { imageSrc } from "../../sanity/sanity-client";

export type TeamHeroContent = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type TeamListingContent = {
  eyebrow: string;
  intro: string;
  categories: TeamVoiceTab[];
  members: TeamMemberDocument[];
};

export function normalizeTeamPageData(page?: TeamPageDocument | null) {
  return { page: page ?? null };
}

export function resolveTeamHero(page?: TeamPageDocument | null): TeamHeroContent | null {
  const hero = page?.hero;
  const title = hero?.title?.trim();
  const description = hero?.description?.trim();
  const imageUrl = imageSrc(hero?.image);

  if (!title && !description && !imageUrl) {
    return null;
  }

  return {
    title: title ?? "",
    description: description ?? "",
    imageUrl,
    imageAlt: hero?.image?.alt,
  };
}

function normalizeMembers(members: TeamMemberDocument[] = []) {
  return members
    .map((member, index) => ({
      ...member,
      _id: member._id || member._key || `member-${index}`,
    }))
    .filter((member) => member.name?.trim());
}

export function resolveTeamListing(page?: TeamPageDocument | null): TeamListingContent | null {
  const listing = page?.listing;
  const eyebrow = listing?.eyebrow?.trim();
  const intro = listing?.intro?.trim();
  const members = normalizeMembers(listing?.members);
  const categories = resolveTeamVoiceTabs(listing?.categories);

  if (!eyebrow && !intro && members.length === 0 && categories.length === 0) {
    return null;
  }

  return {
    eyebrow: eyebrow ?? "",
    intro: intro ?? "",
    categories,
    members,
  };
}
