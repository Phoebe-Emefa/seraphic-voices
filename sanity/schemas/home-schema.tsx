import { requiredAltField } from "./image-fields";
import {
  exactlyArrayCount,
  HOME_REPERTOIRE_PERFORMANCE_COUNT,
  requiredString,
  requiredCmsHref,
  requiredYouTubeChannelUrl,
  requiredYouTubeVideoUrl,
  YOUTUBE_VIDEO_URL_DESCRIPTION,
} from "./validation";

const home = {
  name: "home",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero", title: "Slide photos only", default: true },
    { name: "about", title: "About" },
    { name: "repertoire", title: "Repertoire" },
    { name: "upcomingEvents", title: "Upcoming events" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    {
      name: "hero",
      title: "Slide photos only",
      type: "object",
      group: "hero",
      description:
        "Choir or venue photos for the home hero carousel (shown after any featured events). Event flyers and ticket links are managed under Events.",
      fields: [
        {
          name: "brandPhotos",
          title: "Slide photos",
          type: "array",
          description: "Upload at least 3 photos. Do not use event flyers here — set Featured on each Event instead.",
          validation: (Rule: {
            required: () => {
              min: (n: number) => { error: (message: string) => unknown };
            };
          }) =>
            Rule.required()
              .min(3)
              .error("Add at least 3 slide photos for the home hero."),
          of: [
            {
              name: "brandPhoto",
              type: "image",
              title: "Photo",
              options: { hotspot: true },
              fields: [requiredAltField],
              validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
                Rule.required().error("Upload an image for this slide."),
            },
          ],
        },
        {
          name: "headline",
          title: "Slide headline",
          type: "string",
          description: "Shown on slide photos only (not on featured events).",
          validation: requiredString("Headline is required for slide photos."),
        },
        {
          name: "subheadline",
          title: "Slide subheadline",
          type: "text",
          description: "Short line under the headline on slide photos.",
          validation: requiredString("Subheadline is required for slide photos."),
        },
        {
          name: "ctaTitle",
          title: "Slide button label",
          type: "string",
          validation: requiredString("Button label is required for slide photos."),
        },
        {
          name: "ctaHref",
          title: "Slide button URL",
          type: "string",
          description:
            "Internal page (for example: /about-us, /contact-us) or external https:// link.",
          validation: requiredCmsHref("Button URL is required for slide photos."),
        },
      ],
    },
    {
      name: "about",
      title: "About",
      type: "object",
      group: "about",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: requiredString("Eyebrow is required."),
        },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required."),
        },
        {
          name: "body",
          title: "Body",
          type: "text",
          validation: requiredString("Body text is required."),
        },
        {
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [requiredAltField],
          validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
            Rule.required().error("About image is required."),
        },
        {
          name: "ctaTitle",
          title: "Button label",
          type: "string",
          validation: requiredString("Button label is required."),
        },
        {
          name: "ctaHref",
          title: "Button URL",
          type: "string",
          description:
            "Internal page (for example: /about-us, /contact-us) or external https:// link.",
          validation: requiredCmsHref("Button URL is required."),
        },
      ],
    },
    {
      name: "repertoire",
      title: "Repertoire section",
      type: "object",
      group: "repertoire",
      description:
        "Featured repertoire block on the homepage — section header plus exactly 3 performance videos.",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: requiredString("Eyebrow is required."),
        },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required."),
        },
        {
          name: "intro",
          title: "Intro",
          type: "text",
          validation: requiredString("Intro is required."),
        },
        {
          name: "ctaTitle",
          title: "YouTube channel button label",
          type: "string",
          description: "For example: View full channel",
          validation: requiredString("YouTube channel button label is required."),
        },
        {
          name: "ctaHref",
          title: "YouTube channel button URL",
          type: "url",
          description:
            "Your channel page — for example https://www.youtube.com/@YourChannel (not a single video link).",
          validation: requiredYouTubeChannelUrl(
            "YouTube channel URL is required (for example: https://www.youtube.com/@YourChannel).",
          ),
        },
        {
          name: "performances",
          title: "Performance videos",
          type: "array",
          description: `Add exactly ${HOME_REPERTOIRE_PERFORMANCE_COUNT} performances for the homepage grid. Thumbnails are pulled automatically from YouTube. If you see a warning on this list, you still need more videos — the count is shown here, not inside each item.`,
          validation: exactlyArrayCount(HOME_REPERTOIRE_PERFORMANCE_COUNT, "performance"),
          of: [
            {
              name: "performance",
              title: "Performance",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Performance title",
                  type: "string",
                  description: "Shown on the video card (for example: Beautiful Star).",
                  validation: requiredString("Performance title is required."),
                },
                {
                  name: "url",
                  title: "YouTube video URL",
                  type: "url",
                  description: YOUTUBE_VIDEO_URL_DESCRIPTION,
                  validation: requiredYouTubeVideoUrl(
                    "YouTube video URL is required (single video link only).",
                  ),
                },
              ],
              preview: {
                select: {
                  title: "title",
                  url: "url",
                },
                prepare({ title, url }: { title?: string; url?: string }) {
                  return {
                    title: title || "Performance",
                    subtitle: url || "YouTube video",
                  };
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "upcomingEvents",
      title: "Upcoming events section",
      type: "object",
      group: "upcomingEvents",
      description:
        "Section header only. Concerts are managed under Events → Listing. The homepage shows the 2 soonest upcoming automatically (by date). View all links to /events.",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: requiredString("Eyebrow is required."),
        },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required."),
        },
        {
          name: "intro",
          title: "Intro",
          type: "text",
          validation: requiredString("Intro is required."),
        },
        {
          name: "viewAllTitle",
          title: "View all events button label",
          type: "string",
          description: "Links to /events automatically (for example: View all events).",
          validation: requiredString("View all events button label is required."),
        },
      ],
    },
    {
      name: "contact",
      title: "Contact band",
      type: "object",
      group: "contact",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: requiredString("Eyebrow is required."),
        },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: requiredString("Heading is required."),
        },
        {
          name: "body",
          title: "Body",
          type: "text",
          validation: requiredString("Body is required."),
        },
        {
          name: "ctaTitle",
          title: "Button label",
          type: "string",
          validation: requiredString("Button label is required."),
        },
        {
          name: "ctaHref",
          title: "Button URL",
          type: "string",
          description:
            "Internal page (for example: /contact-us) or external https:// link.",
          validation: requiredCmsHref("Button URL is required."),
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Home" };
    },
  },
};

export default home;
