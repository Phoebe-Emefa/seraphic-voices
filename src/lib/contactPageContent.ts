import type { ContactPageDocument, ContactSocialLinkDocument } from "@/lib/cms/types";
import { isSocialPlatform, SOCIAL_PLATFORM_CONFIG } from "@/lib/socialPlatforms";
import type { IconType } from "react-icons";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { imageSrc } from "../../sanity/sanity-client";

export type ContactHeroContent = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type ContactSectionContent = {
  eyebrow: string;
  intro: string;
};

export type ResolvedSocialLink = {
  platform: string;
  url: string;
  icon: IconType;
  ariaLabel: string;
};

export type ContactDetailRow = {
  label: string;
  value: string;
  icon: IconType;
  isLink?: boolean;
  href?: string;
};

export type ContactDetailsContent = {
  title: string;
  rows: ContactDetailRow[];
  socialLabel: string;
  socials: ResolvedSocialLink[];
  bookingPrompt: string;
  bookingLinkLabel: string;
  bookingLinkHref: string;
};

export type ContactFormContent = {
  title: string;
  intro: string;
  submitLabel: string;
  emailSubject: string;
  successTitle: string;
  successMessage: string;
  successCloseLabel: string;
  errorMessage: string;
};

const CONTACT_DETAIL_ICONS = {
  address: FaLocationDot,
  phone: FaPhoneAlt,
  email: MdEmail,
} as const;

export function normalizeContactPageData(page?: ContactPageDocument | null) {
  return { page: page ?? null };
}

export function resolveContactHero(page?: ContactPageDocument | null): ContactHeroContent | null {
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

export function resolveContactSection(
  page?: ContactPageDocument | null,
): ContactSectionContent | null {
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

function resolveSocialLinks(socials: ContactSocialLinkDocument[] = []): ResolvedSocialLink[] {
  const seen = new Set<string>();
  const resolved: ResolvedSocialLink[] = [];

  for (const social of socials) {
    const platform = social.platform?.trim().toLowerCase();
    const url = social.url?.trim();
    if (!platform || !url || !isSocialPlatform(platform) || seen.has(platform)) {
      continue;
    }

    seen.add(platform);
    const config = SOCIAL_PLATFORM_CONFIG[platform];

    resolved.push({
      platform,
      url,
      icon: config.icon,
      ariaLabel: config.label,
    });
  }

  return resolved;
}

function buildContactRows(content?: ContactPageDocument["content"]): ContactDetailRow[] {
  const address = content?.address?.trim();
  const phoneNumber = content?.phoneNumber?.trim();
  const email = content?.email?.trim();

  const rows: ContactDetailRow[] = [];

  if (address && content?.addressLabel?.trim()) {
    rows.push({
      label: content.addressLabel.trim(),
      value: address,
      icon: CONTACT_DETAIL_ICONS.address,
    });
  }

  if (phoneNumber && content?.phoneLabel?.trim()) {
    rows.push({
      label: content.phoneLabel.trim(),
      value: phoneNumber,
      icon: CONTACT_DETAIL_ICONS.phone,
      isLink: true,
      href: `tel:${phoneNumber.replace(/\s/g, "")}`,
    });
  }

  if (email && content?.emailLabel?.trim()) {
    rows.push({
      label: content.emailLabel.trim(),
      value: email,
      icon: CONTACT_DETAIL_ICONS.email,
      isLink: true,
      href: `mailto:${email}`,
    });
  }

  return rows;
}

export function resolveContactDetails(
  page?: ContactPageDocument | null,
): ContactDetailsContent | null {
  const content = page?.content;
  const title = content?.infoTitle?.trim();
  const rows = buildContactRows(content);
  const socialLabel = content?.socialLabel?.trim();
  const socials = resolveSocialLinks(content?.socials);
  const bookingPrompt = content?.bookingPrompt?.trim();
  const bookingLinkLabel = content?.bookingLinkLabel?.trim();
  const bookingLinkHref = content?.bookingLinkHref?.trim();

  if (
    !title &&
    rows.length === 0 &&
    socials.length === 0 &&
    !bookingPrompt &&
    !bookingLinkLabel &&
    !bookingLinkHref
  ) {
    return null;
  }

  return {
    title: title ?? "",
    rows,
    socialLabel: socialLabel ?? "",
    socials,
    bookingPrompt: bookingPrompt ?? "",
    bookingLinkLabel: bookingLinkLabel ?? "",
    bookingLinkHref: bookingLinkHref ?? "",
  };
}

export function resolveContactForm(page?: ContactPageDocument | null): ContactFormContent | null {
  const content = page?.content;
  const title = content?.formTitle?.trim();
  const intro = content?.formIntro?.trim();
  const submitLabel = content?.submitLabel?.trim();
  const emailSubject = content?.emailSubject?.trim();
  const successTitle = content?.successTitle?.trim();
  const successMessage = content?.successMessage?.trim();
  const successCloseLabel = content?.successCloseLabel?.trim();
  const errorMessage = content?.errorMessage?.trim();

  if (
    !title &&
    !intro &&
    !submitLabel &&
    !emailSubject &&
    !successTitle &&
    !successMessage &&
    !successCloseLabel &&
    !errorMessage
  ) {
    return null;
  }

  return {
    title: title ?? "",
    intro: intro ?? "",
    submitLabel: submitLabel ?? "",
    emailSubject: emailSubject ?? "",
    successTitle: successTitle ?? "",
    successMessage: successMessage ?? "",
    successCloseLabel: successCloseLabel ?? "",
    errorMessage: errorMessage ?? "",
  };
}

export function resolveFooterContact(page?: ContactPageDocument | null) {
  const content = page?.content;
  const address = content?.address?.trim();
  const phoneNumber = content?.phoneNumber?.trim();
  const email = content?.email?.trim();
  const socials = resolveSocialLinks(content?.socials);

  if (!address && !phoneNumber && !email && socials.length === 0) {
    return null;
  }

  return {
    address: address ?? "",
    phoneNumber: phoneNumber ?? "",
    email: email ?? "",
    socials,
  };
}

export function hasContactSectionContent(page?: ContactPageDocument | null) {
  return Boolean(
    resolveContactSection(page) || resolveContactDetails(page) || resolveContactForm(page),
  );
}

export function hasContactPageContent(page?: ContactPageDocument | null) {
  return Boolean(resolveContactHero(page) || hasContactSectionContent(page));
}
