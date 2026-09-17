/**
 * Seeds contactPage from legacy contactHero + contactInfo documents.
 *
 * Run: pnpm seed:contact-page
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

function createKey() {
  return randomBytes(6).toString("hex");
}

const DEFAULT_HERO = {
  title: "Contact Us",
  description:
    "We'd love to hear from you — bookings, auditions, collaborations, or a simple hello.",
};

const DEFAULT_CONTENT = {
  eyebrow: "Reach Out",
  intro:
    "Whether you're curious about joining the choir, booking Seraphic Voices for your venue, or have a question about upcoming events — send us a message and we'll get back to you soon.",
  infoTitle: "Get in touch",
  address: "Greater Toronto Area, Ontario, Canada",
  phoneNumber: "",
  email: "info@seraphicvoicestoronto.com",
  socialLabel: "Follow us",
  socials: [
    {
      platform: "facebook",
      url: "https://web.facebook.com/profile.php?id=100064140482985",
    },
    {
      platform: "youtube",
      url: "https://www.youtube.com/channel/UCW_aWGQSe4kN9vKA1Hd_qVg",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/seraphicvoicesoftoronto/?hl=en",
    },
  ],
  bookingPrompt: "Interested in booking us for your event?",
  bookingLinkLabel: "View events",
  bookingLinkHref: "/events",
  addressLabel: "Address",
  phoneLabel: "Phone",
  emailLabel: "Email",
  formTitle: "Send us a message",
  formIntro: "Fill in the form below and we'll respond as soon as we can.",
  submitLabel: "Send message",
  emailSubject: "Message from Website",
  successTitle: "Thank you for reaching out",
  successMessage: "We've received your message and will get back to you as soon as we can.",
  successCloseLabel: "Close",
  errorMessage: "We could not send your message. Please try again.",
};

const CONTACT_PAGE_IDS = ["drafts.contactPage", "contactPage"];

function toSocialItems(socials = []) {
  return socials
    .map((social) => {
      const platform = String(social.platform ?? "").trim();
      const url = String(social.url ?? "").trim();
      if (!platform || !url) return null;

      return {
        _key: social._key || createKey(),
        _type: "socialLink",
        platform,
        url,
      };
    })
    .filter(Boolean);
}

async function fetchContactPage(client) {
  return client.fetch(`*[_id in $ids] | order(_id asc) [0]`, {
    ids: CONTACT_PAGE_IDS,
  });
}

async function seedContactPage({ force = false } = {}) {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const [legacyHero, legacyInfo, contactPage] = await Promise.all([
    client.fetch(
      `*[_type == "contactHero"] | order(_updatedAt desc) [0]{
        title,
        description,
        image
      }`,
    ),
    client.fetch(
      `*[_type == "contactInfo"] | order(_updatedAt desc) [0]{
        title,
        address,
        phoneNumber,
        email
      }`,
    ),
    fetchContactPage(client),
  ]);

  if (contactPage?.hero?.title && contactPage?.content?.formTitle && !force) {
    console.log(`contactPage already exists on "${dataset}". Use --force to overwrite.`);
    return;
  }

  const hero = contactPage?.hero?.title
    ? contactPage.hero
    : legacyHero?.title
      ? {
          title: legacyHero.title,
          description: legacyHero.description ?? "",
          ...(legacyHero.image?.asset ? { image: legacyHero.image } : {}),
        }
      : DEFAULT_HERO;

  const existingContent = contactPage?.content ?? {};
  const content = {
    eyebrow: existingContent.eyebrow?.trim() || DEFAULT_CONTENT.eyebrow,
    intro: existingContent.intro?.trim() || DEFAULT_CONTENT.intro,
    infoTitle:
      existingContent.infoTitle?.trim() ||
      legacyInfo?.title?.trim() ||
      DEFAULT_CONTENT.infoTitle,
    address:
      existingContent.address?.trim() ||
      legacyInfo?.address?.trim() ||
      DEFAULT_CONTENT.address,
    phoneNumber:
      existingContent.phoneNumber?.trim() ||
      legacyInfo?.phoneNumber?.trim() ||
      DEFAULT_CONTENT.phoneNumber,
    email:
      existingContent.email?.trim() ||
      legacyInfo?.email?.trim() ||
      DEFAULT_CONTENT.email,
    socialLabel: existingContent.socialLabel?.trim() || DEFAULT_CONTENT.socialLabel,
    socials:
      toSocialItems(existingContent.socials).length > 0
        ? toSocialItems(existingContent.socials)
        : DEFAULT_CONTENT.socials.map((social) => ({
            _key: createKey(),
            _type: "socialLink",
            ...social,
          })),
    bookingPrompt:
      existingContent.bookingPrompt?.trim() || DEFAULT_CONTENT.bookingPrompt,
    bookingLinkLabel:
      existingContent.bookingLinkLabel?.trim() || DEFAULT_CONTENT.bookingLinkLabel,
    bookingLinkHref:
      existingContent.bookingLinkHref?.trim() || DEFAULT_CONTENT.bookingLinkHref,
    addressLabel: existingContent.addressLabel?.trim() || DEFAULT_CONTENT.addressLabel,
    phoneLabel: existingContent.phoneLabel?.trim() || DEFAULT_CONTENT.phoneLabel,
    emailLabel: existingContent.emailLabel?.trim() || DEFAULT_CONTENT.emailLabel,
    formTitle: existingContent.formTitle?.trim() || DEFAULT_CONTENT.formTitle,
    formIntro: existingContent.formIntro?.trim() || DEFAULT_CONTENT.formIntro,
    submitLabel: existingContent.submitLabel?.trim() || DEFAULT_CONTENT.submitLabel,
    emailSubject: existingContent.emailSubject?.trim() || DEFAULT_CONTENT.emailSubject,
    successTitle: existingContent.successTitle?.trim() || DEFAULT_CONTENT.successTitle,
    successMessage:
      existingContent.successMessage?.trim() || DEFAULT_CONTENT.successMessage,
    successCloseLabel:
      existingContent.successCloseLabel?.trim() || DEFAULT_CONTENT.successCloseLabel,
    errorMessage: existingContent.errorMessage?.trim() || DEFAULT_CONTENT.errorMessage,
  };

  const targetId = contactPage?._id ?? "contactPage";

  if (contactPage?._id) {
    await client.patch(targetId).set({ hero, content }).commit();
  } else {
    await client.createOrReplace({
      _id: "contactPage",
      _type: "contactPage",
      hero,
      content,
    });
  }

  console.log(`Seeded contactPage on "${dataset}".`);
  console.log("Open Contact in Studio and publish when ready.");
}

const force = process.argv.includes("--force");

seedContactPage({ force }).catch((error) => {
  console.error(error);
  process.exit(1);
});
