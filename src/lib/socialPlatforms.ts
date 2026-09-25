import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export const SOCIAL_PLATFORM_VALUES = [
  "youtube",
  "facebook",
  "instagram",
  "tiktok",
  "x",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORM_VALUES)[number];

type SocialPlatformConfig = {
  icon: IconType;
  label: string;
};

export const SOCIAL_PLATFORM_CONFIG: Record<SocialPlatform, SocialPlatformConfig> = {
  youtube: { icon: FaYoutube, label: "YouTube" },
  facebook: { icon: FaFacebook, label: "Facebook" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
  x: { icon: FaXTwitter, label: "X" },
};

export function isSocialPlatform(value: string): value is SocialPlatform {
  return (SOCIAL_PLATFORM_VALUES as readonly string[]).includes(value);
}
