import { requiredAltField } from "./image-fields";
import {
  featuredMustBeUpcoming,
  requiredString,
} from "./validation";

/** Shared concert fields — used in Events page → Listing → items[]. */
export const eventItemFieldsets = [
  {
    name: "concertBasics",
    title: "Concert details",
    options: { collapsible: true, collapsed: false },
  },
  {
    name: "homeHero",
    title: "Home hero slider",
    options: { collapsible: true, collapsed: true },
  },
  {
    name: "detailsPage",
    title: "Event page",
    options: { collapsible: true, collapsed: false },
  },
];

/** Shared concert fields — used in Events page → Listing → items[]. */
export const eventItemFields = [
  {
    name: "featured",
    title: "Featured on home hero",
    type: "boolean",
    fieldset: "homeHero",
    description:
      "When on, this upcoming concert is added to the home hero slider (before general slide photos on Home).",
    initialValue: false,
    validation: featuredMustBeUpcoming(),
  },
  {
    name: "title",
    title: "Title",
    type: "string",
    fieldset: "concertBasics",
    description:
      "The shareable event page URL is created automatically from this title (for example: An African Christmas → /events/an-african-christmas).",
    validation: requiredString("Title is required."),
  },
  {
    name: "start_date",
    title: "Start date & time (Toronto)",
    type: "datetime",
    fieldset: "concertBasics",
    description:
      "Eastern (Toronto) time. Used for display and sorting. Upcoming vs past uses the end date.",
    validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
      Rule.required().error("Start date and time is required."),
  },
  {
    name: "end_date",
    title: "End date & time (Toronto)",
    type: "datetime",
    fieldset: "concertBasics",
    description:
      "When this moment passes, the concert moves to Past automatically on /events.",
    validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
      Rule.required().error("End date and time is required."),
  },
  {
    name: "location",
    title: "Location",
    type: "string",
    fieldset: "concertBasics",
    validation: requiredString("Location is required."),
  },
  {
    name: "image",
    title: "Event image",
    type: "image",
    fieldset: "concertBasics",
    description: "Shown on event cards, the hero slider, and the event page.",
    options: { hotspot: true },
    fields: [requiredAltField],
    validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
      Rule.required().error("Event image is required."),
  },
  {
    name: "ticket_url",
    title: "Ticket URL",
    type: "url",
    fieldset: "concertBasics",
    description: "Optional HTTPS link for the Purchase tickets button on cards and the event page.",
  },
  {
    name: "description",
    title: "Event description",
    type: "array",
    fieldset: "detailsPage",
    description: "Rich text shown on the shareable event page.",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "H1", value: "h1" },
          { title: "H2", value: "h2" },
          { title: "H3", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Underline", value: "underline" },
            { title: "Strike", value: "strike-through" },
          ],
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "url",
                },
              ],
            },
          ],
        },
      },
    ],
    validation: (Rule: { required: () => { error: (message: string) => unknown } }) =>
      Rule.required().error("Description is required for the event page on the website."),
  },
];

export const eventItemPreview = {
  select: {
    title: "title",
    featured: "featured",
    start_date: "start_date",
    media: "image",
  },
  prepare({
    title,
    featured,
    start_date,
    media,
  }: {
    title?: string;
    featured?: boolean;
    start_date?: string;
    media?: unknown;
  }) {
    const dateLabel = start_date
      ? new Date(start_date).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })
      : undefined;
    return {
      title: title || "Concert",
      subtitle: [featured ? "Featured" : null, dateLabel].filter(Boolean).join(" · ") || undefined,
      media,
    };
  },
};
