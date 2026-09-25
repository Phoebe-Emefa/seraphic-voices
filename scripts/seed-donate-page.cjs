/**
 * Seeds donatePage from legacy donateHero + donation documents.
 *
 * Run: pnpm seed:donate-page
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

function createKey() {
  return randomBytes(6).toString("hex");
}

const DEFAULT_HERO = {
  title: "Donate",
  description:
    "Your generosity helps Seraphic Voices bring choral music, community, and faith to audiences across Toronto.",
};

const DEFAULT_CONTENT = {
  eyebrow: "Support Our Mission",
  intro:
    "Every gift fuels rehearsals, outreach programmes, and performances that honour African sacred music and the wider choral tradition. Thank you for believing in what we do.",
  impactTitle: "Your gift makes a difference",
  impactBody:
    "From sheet music and venue costs to community workshops and concert production, your support keeps Seraphic Voices singing — on stage, in churches, and in neighbourhoods across the GTA.",
  ctaLabel: "Contact us",
  ctaHref: "/contact-us",
  instructionsTitle: "How to give",
  instructions: [
    "Send an e-transfer to donations@seraphicvoicestoronto.com. Please include your name in the message field so we can acknowledge your gift.",
    "Alternatively, mail a cheque payable to Seraphic Voices of Toronto to our mailing address. Contact us for the current address.",
    "For questions about planned giving, sponsorships, or in-kind donations, please reach out — we would be glad to speak with you.",
  ],
};

const DONATE_PAGE_IDS = ["drafts.donatePage", "donatePage"];

function toInstructionItems(instructions = []) {
  return instructions
    .map((instruction) => {
      const text = String(
        typeof instruction === "string" ? instruction : instruction?.text ?? "",
      ).trim();
      if (!text) return null;

      return {
        _key: instruction?._key || createKey(),
        _type: "instruction",
        text,
      };
    })
    .filter(Boolean);
}

async function fetchDonatePage(client) {
  return client.fetch(`*[_id in $ids] | order(_id asc) [0]`, {
    ids: DONATE_PAGE_IDS,
  });
}

async function seedDonatePage({ force = false } = {}) {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const [legacyHero, legacyDonation, donatePage] = await Promise.all([
    client.fetch(
      `*[_type == "donateHero"] | order(_updatedAt desc) [0]{
        title,
        description,
        image
      }`,
    ),
    client.fetch(
      `*[_type == "donation"] | order(_updatedAt desc) [0]{
        title,
        donationInstruction
      }`,
    ),
    fetchDonatePage(client),
  ]);

  if (donatePage?.hero?.title && donatePage?.content?.instructionsTitle && !force) {
    console.log(`donatePage already exists on "${dataset}". Use --force to overwrite.`);
    return;
  }

  const hero = donatePage?.hero?.title
    ? donatePage.hero
    : legacyHero?.title
      ? {
          title: legacyHero.title,
          description: legacyHero.description ?? "",
          ...(legacyHero.image?.asset ? { image: legacyHero.image } : {}),
        }
      : DEFAULT_HERO;

  const existingContent = donatePage?.content ?? {};
  const legacySteps =
    legacyDonation?.donationInstruction?.length > 0
      ? legacyDonation.donationInstruction
      : DEFAULT_CONTENT.instructions;

  const content = {
    eyebrow: existingContent.eyebrow?.trim() || DEFAULT_CONTENT.eyebrow,
    intro: existingContent.intro?.trim() || DEFAULT_CONTENT.intro,
    impactTitle: existingContent.impactTitle?.trim() || DEFAULT_CONTENT.impactTitle,
    impactBody: existingContent.impactBody?.trim() || DEFAULT_CONTENT.impactBody,
    ctaLabel: existingContent.ctaLabel?.trim() || DEFAULT_CONTENT.ctaLabel,
    ctaHref: existingContent.ctaHref?.trim() || DEFAULT_CONTENT.ctaHref,
    instructionsTitle:
      existingContent.instructionsTitle?.trim() ||
      legacyDonation?.title?.trim() ||
      DEFAULT_CONTENT.instructionsTitle,
    instructions:
      toInstructionItems(existingContent.instructions).length > 0
        ? toInstructionItems(existingContent.instructions)
        : toInstructionItems(legacySteps),
  };

  const targetId = donatePage?._id ?? "donatePage";

  if (donatePage?._id) {
    await client.patch(targetId).set({ hero, content }).commit();
  } else {
    await client.createOrReplace({
      _id: "donatePage",
      _type: "donatePage",
      hero,
      content,
    });
  }

  console.log(`Seeded donatePage on "${dataset}".`);
  console.log("Open Donate in Studio and publish when ready.");
}

const force = process.argv.includes("--force");

seedDonatePage({ force }).catch((error) => {
  console.error(error);
  process.exit(1);
});
