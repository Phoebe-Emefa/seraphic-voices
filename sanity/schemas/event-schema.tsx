import { requiredAltField } from "./image-fields";
import { eventItemFields, eventItemFieldsets, eventItemPreview } from "./event-item-fields";
import { requiredCmsHref, requiredString } from "./validation";

const event = {
  name: "event",
  title: "Events",
  type: "document",
  description:
    "Events page (/events) and all concerts. Add each concert under Listing → Concerts. Upcoming vs Past on the site is automatic from dates.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "listing", title: "Listing" },
    { name: "cta", title: "Booking CTA" },
  ],
  fields: [
    {
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: requiredString("Hero title is required."),
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          validation: requiredString("Hero description is required."),
        },
        {
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [requiredAltField],
          validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
            Rule.required().error("Hero image is required."),
        },
      ],
    },
    {
      name: "listing",
      title: "Listing",
      type: "object",
      group: "listing",
      description:
        "Page labels and all concerts. Edit the Draft (not Published) to add concerts. The site splits them into Upcoming and Past by date.",
      fieldsets: [
        {
          name: "listingIntro",
          title: "Section intro",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "listingLabels",
          title: "Tabs & buttons",
          options: { collapsible: true, collapsed: true },
        },
        {
          name: "concerts",
          title: "Concerts",
          options: { collapsible: true, collapsed: false },
        },
      ],
      fields: [
        {
          name: "eyebrow",
          title: "Listing eyebrow",
          type: "string",
          fieldset: "listingIntro",
          validation: requiredString("Listing eyebrow is required."),
        },
        {
          name: "heading",
          title: "Listing heading",
          type: "string",
          fieldset: "listingIntro",
          validation: requiredString("Listing heading is required."),
        },
        {
          name: "intro",
          title: "Listing intro",
          type: "text",
          fieldset: "listingIntro",
          validation: requiredString("Listing intro is required."),
        },
        {
          name: "upcomingTab",
          title: "Upcoming tab label",
          type: "string",
          fieldset: "listingLabels",
          description:
            "Tab label and small tag on upcoming event cards — concerts are placed here automatically by date.",
          validation: requiredString("Upcoming tab label is required."),
        },
        {
          name: "pastTab",
          title: "Past tab label",
          type: "string",
          fieldset: "listingLabels",
          description:
            "Tab label and small tag on past event cards — ended concerts appear here automatically.",
          validation: requiredString("Past tab label is required."),
        },
        {
          name: "ticketButtonLabel",
          title: "Purchase tickets button label",
          type: "string",
          fieldset: "listingLabels",
          description:
            "Used on featured hero slides, homepage event cards, and event cards (for example: Purchase tickets).",
          validation: requiredString(
            "Purchase tickets button label is required (for example: Purchase tickets).",
          ),
        },
        {
          name: "detailsLabel",
          title: "View details button label",
          type: "string",
          fieldset: "listingLabels",
          description:
            "Links to the shareable event page from cards and the home hero (for example: View details).",
          validation: requiredString(
            "View details button label is required (for example: View concert details).",
          ),
        },
        {
          name: "items",
          title: "Concerts",
          type: "array",
          fieldset: "concerts",
          description:
            "Add each concert once. Toggle Featured on home hero for slider placement. The homepage upcoming section shows the 2 soonest upcoming concerts automatically.",
          of: [
            {
              name: "concert",
              title: "Concert",
              type: "object",
              fieldsets: eventItemFieldsets,
              fields: eventItemFields,
              preview: eventItemPreview,
            },
          ],
        },
      ],
    },
    {
      name: "bookingCta",
      title: "Booking CTA",
      type: "object",
      group: "cta",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: requiredString("Booking CTA title is required."),
        },
        {
          name: "body",
          title: "Body",
          type: "text",
          validation: requiredString("Booking CTA body is required."),
        },
        {
          name: "button",
          title: "Button label",
          type: "string",
          validation: requiredString("Booking CTA button label is required."),
        },
        {
          name: "href",
          title: "Button URL",
          type: "string",
          description:
            "Internal page (for example: /contact-us) or external https:// link.",
          validation: requiredCmsHref("Booking CTA button URL is required."),
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Events" };
    },
  },
};

export default event;
