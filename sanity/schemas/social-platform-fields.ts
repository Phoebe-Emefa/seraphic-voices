export const SOCIAL_PLATFORMS = [
  { title: "YouTube", value: "youtube" },
  { title: "Facebook", value: "facebook" },
  { title: "Instagram", value: "instagram" },
  { title: "TikTok", value: "tiktok" },
  { title: "X", value: "x" },
] as const;

export type SocialPlatformValue = (typeof SOCIAL_PLATFORMS)[number]["value"];

export function socialPlatformLabel(platform?: string) {
  return (
    SOCIAL_PLATFORMS.find((item) => item.value === platform)?.title ??
    platform ??
    "Social link"
  );
}

export const socialLinkFields = [
  {
    name: "platform",
    title: "Platform",
    type: "string",
    options: {
      list: [...SOCIAL_PLATFORMS],
      layout: "dropdown",
    },
    validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
      Rule.required().error("Choose a platform."),
  },
  {
    name: "url",
    title: "Profile URL",
    type: "url",
    validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
      Rule.required().error("Enter the profile URL for this platform."),
  },
];

export const socialLinkPreview = {
  select: {
    platform: "platform",
    url: "url",
  },
  prepare({ platform, url }: { platform?: string; url?: string }) {
    return {
      title: socialPlatformLabel(platform),
      subtitle: url,
    };
  },
};
