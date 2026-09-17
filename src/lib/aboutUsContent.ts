import type { WhoWeArePageDocument } from "@/lib/cms/types";
import { hasPortableText, type PortableBlock } from "@/lib/portableText";
import { cleanMissionStatement, splitMissionLines } from "@/lib/missionText";
import { imageSrc } from "../../sanity/sanity-client";

export type StoryBlockLayout = "textImage" | "fullWidth" | "imageText";

export type AboutStoryBlock = {
  layout: StoryBlockLayout;
  content: PortableBlock[];
  imageUrl?: string;
  imageAlt?: string;
  taglines: PortableBlock[];
};

export type AboutHeroContent = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type AboutStoryContent = {
  title: string;
  blocks: AboutStoryBlock[];
};

export type AboutVisionContent = {
  eyebrow: string;
  founderName: string;
  founderTitle: string;
  content: PortableBlock[];
  approach: PortableBlock[];
  imageUrl?: string;
  imageAlt?: string;
};

export type AboutMissionContent = {
  eyebrow: string;
  statement: string;
  statementLines: string[];
  pillars: Array<{ title: string; body: string }>;
};

const STORY_LAYOUTS = new Set<StoryBlockLayout>(["textImage", "fullWidth", "imageText"]);

type StoryCmsBlock = NonNullable<NonNullable<WhoWeArePageDocument["story"]>["blocks"]>[number];

function resolveStoryBlock(block: StoryCmsBlock): AboutStoryBlock | null {
  const layout = block?.layout;
  if (!layout || !STORY_LAYOUTS.has(layout as StoryBlockLayout)) {
    return null;
  }

  const content = (block.content ?? []) as PortableBlock[];
  const taglines = (block.taglines ?? []) as PortableBlock[];
  const imageUrl = imageSrc(block.image);

  const hasContent = hasPortableText(content);
  const hasTaglines = hasPortableText(taglines);

  if (!hasContent && !imageUrl && !hasTaglines) {
    return null;
  }

  return {
    layout: layout as StoryBlockLayout,
    content,
    imageUrl,
    imageAlt: block.image?.alt,
    taglines,
  };
}

export function resolveAboutHero(
  page?: WhoWeArePageDocument | null,
): AboutHeroContent | null {
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

export function resolveAboutStory(
  page?: WhoWeArePageDocument | null,
): AboutStoryContent | null {
  const story = page?.story;
  const title = story?.title?.trim();
  const blocks =
    story?.blocks
      ?.map(resolveStoryBlock)
      .filter((block): block is AboutStoryBlock => block !== null) ?? [];

  if (!title && blocks.length === 0) {
    return null;
  }

  return {
    title: title ?? "",
    blocks,
  };
}

export function resolveAboutVision(
  page?: WhoWeArePageDocument | null,
): AboutVisionContent | null {
  const vision = page?.vision;
  const eyebrow = vision?.eyebrow?.trim();
  const founderName = vision?.founderName?.trim();
  const founderTitle = vision?.founderTitle?.trim();
  const content = (vision?.content ?? []) as PortableBlock[];
  const approach = (vision?.approachPassage ?? []) as PortableBlock[];
  const imageUrl = imageSrc(vision?.founderImage);
  const hasContent = hasPortableText(content);
  const hasApproach = hasPortableText(approach);

  if (
    !eyebrow &&
    !founderName &&
    !founderTitle &&
    !hasContent &&
    !hasApproach &&
    !imageUrl
  ) {
    return null;
  }

  return {
    eyebrow: eyebrow ?? "",
    founderName: founderName ?? "",
    founderTitle: founderTitle ?? "",
    content,
    approach,
    imageUrl,
    imageAlt: vision?.founderImage?.alt || founderName || "",
  };
}

export function resolveAboutMission(
  page?: WhoWeArePageDocument | null,
): AboutMissionContent | null {
  const mission = page?.mission;
  const eyebrow = mission?.eyebrow?.trim();
  const rawStatement = mission?.statement?.trim();
  const pillars =
    mission?.pillars
      ?.map((pillar) => ({
        title: pillar.title?.trim() ?? "",
        body: pillar.body?.trim() ?? "",
      }))
      .filter((pillar) => pillar.title || pillar.body) ?? [];

  if (!eyebrow && !rawStatement && pillars.length === 0) {
    return null;
  }

  return {
    eyebrow: eyebrow ?? "",
    statement: rawStatement ? cleanMissionStatement(rawStatement) : "",
    statementLines: rawStatement ? splitMissionLines(rawStatement) : [],
    pillars,
  };
}

export function resolveAboutBelief(page?: WhoWeArePageDocument | null): string | null {
  const text = page?.belief?.text?.trim();
  return text || null;
}
