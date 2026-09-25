import type { DonateInstructionDocument, DonatePageDocument } from "@/lib/cms/types";
import { imageSrc } from "../../sanity/sanity-client";

export type DonateHeroContent = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type DonateSectionIntro = {
  eyebrow: string;
  intro: string;
};

export type DonateImpactContent = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type DonateInstructionsContent = {
  title: string;
  steps: string[];
};

export function normalizeDonatePageData(page?: DonatePageDocument | null) {
  return { page: page ?? null };
}

export function resolveDonateHero(page?: DonatePageDocument | null): DonateHeroContent | null {
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

export function resolveDonateSectionIntro(
  page?: DonatePageDocument | null,
): DonateSectionIntro | null {
  const content = page?.content;
  const eyebrow = content?.eyebrow?.trim();
  const intro = content?.intro?.trim();

  if (!eyebrow && !intro) {
    return null;
  }

  return {
    eyebrow: eyebrow ?? "",
    intro: intro ?? "",
  };
}

export function resolveDonateImpact(page?: DonatePageDocument | null): DonateImpactContent | null {
  const content = page?.content;
  const title = content?.impactTitle?.trim();
  const body = content?.impactBody?.trim();
  const ctaLabel = content?.ctaLabel?.trim();
  const ctaHref = content?.ctaHref?.trim();

  if (!title && !body && !ctaLabel && !ctaHref) {
    return null;
  }

  return {
    title: title ?? "",
    body: body ?? "",
    ctaLabel: ctaLabel ?? "",
    ctaHref: ctaHref ?? "",
  };
}

function normalizeInstructionSteps(
  instructions: DonateInstructionDocument[] = [],
): string[] {
  return instructions
    .map((instruction) => instruction.text?.trim())
    .filter((text): text is string => Boolean(text));
}

export function resolveDonateInstructions(
  page?: DonatePageDocument | null,
): DonateInstructionsContent | null {
  const content = page?.content;
  const title = content?.instructionsTitle?.trim();
  const steps = normalizeInstructionSteps(content?.instructions);

  if (!title && steps.length === 0) {
    return null;
  }

  return {
    title: title ?? "",
    steps,
  };
}

export function hasDonateSectionContent(page?: DonatePageDocument | null) {
  return Boolean(
    resolveDonateSectionIntro(page) ||
      resolveDonateImpact(page) ||
      resolveDonateInstructions(page),
  );
}

export function hasDonatePageContent(page?: DonatePageDocument | null) {
  return Boolean(resolveDonateHero(page) || hasDonateSectionContent(page));
}
