import { ABOUT_US_FALLBACK } from "@/data/aboutUsContent";
import { cleanMissionStatement, splitMissionLines } from "@/lib/missionText";
import { imageSrc } from "../../sanity/sanity-client";

export type WhoWeAreContent = {
  title?: string;
  description_1?: string;
  description_2?: string;
  description_3?: string;
  image?: { asset?: { _ref?: string }; alt?: string };
  story_images?: Array<{ asset?: { _ref?: string }; alt?: string }>;
  founder_name?: string;
  founder_title?: string;
  founder_image?: { asset?: { _ref?: string }; alt?: string };
  vision_paragraph_1?: string;
  vision_paragraph_2?: string;
  approach_paragraph?: string;
  mission?: string;
  faith?: string;
  heritage?: string;
  excellence?: string;
  closing_belief?: string;
};

const STORY_IMAGE_FALLBACKS = [
  {
    url: "https://picsum.photos/seed/seraphic-story-hero/1600/900",
    alt: "Seraphic Voices performing on stage",
  },
  {
    url: "https://picsum.photos/seed/seraphic-story-ensemble/1200/800",
    alt: "Seraphic Voices ensemble in concert",
  },
  {
    url: "https://picsum.photos/seed/seraphic-story-choir/1200/800",
    alt: "Choir members during a live performance",
  },
] as const;

const FOUNDER_IMAGE_FALLBACK = "https://picsum.photos/seed/seraphic-founder/900/1100";

export type StoryImage = {
  url: string;
  alt: string;
};

export function resolveAboutStory(content?: WhoWeAreContent) {
  const paragraphs = [
    content?.description_1,
    content?.description_2,
    content?.description_3,
  ].filter(Boolean) as string[];

  const cmsImages: StoryImage[] = [];

  const primaryUrl = imageSrc(content?.image?.asset?._ref);
  if (primaryUrl) {
    cmsImages.push({
      url: primaryUrl,
      alt: content?.image?.alt || STORY_IMAGE_FALLBACKS[0].alt,
    });
  }

  for (const item of content?.story_images ?? []) {
    const url = imageSrc(item?.asset?._ref);
    if (url) {
      cmsImages.push({
        url,
        alt: item?.alt || "Seraphic Voices of Toronto",
      });
    }
  }

  const images: StoryImage[] =
    cmsImages.length > 0
      ? [
          ...cmsImages,
          ...STORY_IMAGE_FALLBACKS.filter(
            (_, index) => index >= cmsImages.length,
          ),
        ].slice(0, 3)
      : [...STORY_IMAGE_FALLBACKS];

  return {
    title: content?.title || ABOUT_US_FALLBACK.story.title,
    paragraphs: paragraphs.length ? paragraphs : ABOUT_US_FALLBACK.story.paragraphs,
    images,
  };
}

export function resolveAboutVision(content?: WhoWeAreContent) {
  const paragraphs = [content?.vision_paragraph_1, content?.vision_paragraph_2].filter(
    Boolean,
  ) as string[];

  return {
    eyebrow: ABOUT_US_FALLBACK.vision.eyebrow,
    founderName: content?.founder_name || ABOUT_US_FALLBACK.vision.founderName,
    founderTitle: content?.founder_title || ABOUT_US_FALLBACK.vision.founderTitle,
    paragraphs: paragraphs.length ? paragraphs : ABOUT_US_FALLBACK.vision.paragraphs,
    approach: content?.approach_paragraph || ABOUT_US_FALLBACK.vision.approach,
    imageUrl: imageSrc(content?.founder_image?.asset?._ref) || FOUNDER_IMAGE_FALLBACK,
    imageAlt: content?.founder_image?.alt || content?.founder_name || "Founder portrait",
  };
}

export function resolveAboutMission(content?: WhoWeAreContent) {
  const pillars = [
    { title: "Faith", body: content?.faith || ABOUT_US_FALLBACK.mission.pillars[0].body },
    { title: "Heritage", body: content?.heritage || ABOUT_US_FALLBACK.mission.pillars[1].body },
    { title: "Excellence", body: content?.excellence || ABOUT_US_FALLBACK.mission.pillars[2].body },
  ];

  const rawStatement = content?.mission || ABOUT_US_FALLBACK.mission.statement;

  return {
    eyebrow: ABOUT_US_FALLBACK.mission.eyebrow,
    statement: cleanMissionStatement(rawStatement),
    statementLines: splitMissionLines(rawStatement),
    pillars,
  };
}

export function resolveAboutBelief(content?: WhoWeAreContent) {
  return content?.closing_belief || ABOUT_US_FALLBACK.belief;
}
