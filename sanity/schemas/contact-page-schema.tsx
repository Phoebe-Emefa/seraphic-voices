import { requiredAltField } from "./image-fields";
import { socialLinkFields, socialLinkPreview } from "./social-platform-fields";
import { isValidCmsHref } from "./validation";

const contactPage = {
  name: "contactPage",
  title: "Contact",
  type: "document",
  description: "Contact page (/contact-us). The enquiry form is built into the site — edit copy and contact details here.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
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
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "image",
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [requiredAltField],
        },
      ],
    },
    {
      name: "content",
      title: "Content",
      type: "object",
      group: "content",
      fieldsets: [
        {
          name: "sectionIntro",
          title: "Section intro",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "contactDetails",
          title: "Contact details",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "socialLinks",
          title: "Social links",
          options: { collapsible: true, collapsed: false },
        },
        {
          name: "bookingCta",
          title: "Booking prompt",
          options: { collapsible: true, collapsed: true },
        },
        {
          name: "enquiryForm",
          title: "Enquiry form",
          options: { collapsible: true, collapsed: false },
        },
      ],
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          fieldset: "sectionIntro",
          description: "Short label above the intro (for example: Reach Out).",
        },
        {
          name: "intro",
          title: "Intro",
          type: "text",
          fieldset: "sectionIntro",
          description: "Short paragraph above the contact details and enquiry form.",
        },
        {
          name: "infoTitle",
          title: "Details heading",
          type: "string",
          fieldset: "contactDetails",
          description: "Heading above the address, phone, and email cards.",
        },
        {
          name: "addressLabel",
          title: "Address label",
          type: "string",
          fieldset: "contactDetails",
          description: "Card label shown above the address.",
        },
        {
          name: "address",
          title: "Address",
          type: "string",
          fieldset: "contactDetails",
        },
        {
          name: "phoneLabel",
          title: "Phone label",
          type: "string",
          fieldset: "contactDetails",
          description: "Card label shown above the phone number.",
        },
        {
          name: "phoneNumber",
          title: "Phone number",
          type: "string",
          fieldset: "contactDetails",
        },
        {
          name: "emailLabel",
          title: "Email label",
          type: "string",
          fieldset: "contactDetails",
          description: "Card label shown above the email address.",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          fieldset: "contactDetails",
        },
        {
          name: "socialLabel",
          title: "Social heading",
          type: "string",
          fieldset: "socialLinks",
          description: "Label above the social icons (for example: Follow us).",
        },
        {
          name: "socials",
          title: "Social links",
          type: "array",
          fieldset: "socialLinks",
          of: [
            {
              name: "socialLink",
              title: "Social link",
              type: "object",
              fields: socialLinkFields,
              preview: socialLinkPreview,
            },
          ],
        },
        {
          name: "bookingPrompt",
          title: "Booking prompt",
          type: "string",
          fieldset: "bookingCta",
          description: "Short line before the events link.",
        },
        {
          name: "bookingLinkLabel",
          title: "Booking link label",
          type: "string",
          fieldset: "bookingCta",
        },
        {
          name: "bookingLinkHref",
          title: "Booking link URL",
          type: "string",
          fieldset: "bookingCta",
          validation: (Rule: {
            custom: (fn: (value: unknown) => true | string) => unknown;
          }) =>
            Rule.custom((value) => {
              if (typeof value !== "string" || !value.trim()) return true;
              if (isValidCmsHref(value)) return true;
              return "Enter an internal path (for example: /events) or a full https:// URL.";
            }),
        },
        {
          name: "formTitle",
          title: "Form heading",
          type: "string",
          fieldset: "enquiryForm",
          description: "Heading above the enquiry form.",
        },
        {
          name: "formIntro",
          title: "Form intro",
          type: "text",
          fieldset: "enquiryForm",
          description: "Short line under the form heading.",
        },
        {
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
          fieldset: "enquiryForm",
        },
        {
          name: "emailSubject",
          title: "Email subject",
          type: "string",
          fieldset: "enquiryForm",
          description: "Subject line used when the form is submitted (not shown on the page).",
        },
        {
          name: "successTitle",
          title: "Success title",
          type: "string",
          fieldset: "enquiryForm",
          description: "Shown in the confirmation dialog after a successful submission.",
        },
        {
          name: "successMessage",
          title: "Success message",
          type: "text",
          fieldset: "enquiryForm",
        },
        {
          name: "successCloseLabel",
          title: "Success close button",
          type: "string",
          fieldset: "enquiryForm",
        },
        {
          name: "errorMessage",
          title: "Error message",
          type: "string",
          fieldset: "enquiryForm",
          description: "Shown if the form submission fails.",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Contact" };
    },
  },
};

export default contactPage;
