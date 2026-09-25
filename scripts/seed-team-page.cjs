/**
 * Seeds teamPage from legacy `team` member documents (+ optional teamHero).
 *
 * Run: pnpm seed:team-page
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

const DEFAULT_CATEGORIES = [
  { label: "Soprano" },
  { label: "Alto" },
  { label: "Tenor" },
  { label: "Bass" },
  { label: "Organists" },
  { label: "Trumpeters" },
  { label: "Choir Conductor" },
];

const DEFAULT_SECTION = {
  eyebrow: "The Voices",
  intro:
    "From sopranos to conductors, every member brings their gift to the Seraphic family. Browse by voice or role to meet the people behind the music.",
};

const CATEGORY_ALIASES = {
  Conductor: "Choir Conductor",
  "Choir conductor": "Choir Conductor",
};

const TEAM_PAGE_IDS = ["drafts.teamPage", "teamPage"];

function createKey() {
  return randomBytes(6).toString("hex");
}

function normalizeCategory(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "";
  return CATEGORY_ALIASES[trimmed] ?? trimmed;
}

function toCategoryItems(categories) {
  return categories.map((category) => ({
    _key: createKey(),
    _type: "category",
    label: category.label,
  }));
}

function toMemberItem(member) {
  const category = normalizeCategory(member.category);
  if (!member.name?.trim() || !category) {
    return null;
  }

  const item = {
    _key: createKey(),
    _type: "member",
    name: member.name.trim(),
    category,
  };

  if (member.role?.trim()) {
    item.role = member.role.trim();
  }

  if (member.image?.asset) {
    item.image = {
      _type: "image",
      alt: member.image.alt?.trim() || member.name.trim(),
      asset: member.image.asset,
    };
  }

  return item;
}

async function fetchTeamPage(client) {
  return client.fetch(`*[_id in $ids] | order(_id asc) [0]`, {
    ids: TEAM_PAGE_IDS,
  });
}

async function seedTeamPage({ force = false } = {}) {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const [legacyMembers, legacyHero, teamPage] = await Promise.all([
    client.fetch(
      `*[_type == "team"] | order(name asc) {
        name,
        role,
        category,
        image
      }`,
    ),
    client.fetch(
      `*[_type == "teamHero"] | order(_updatedAt desc) [0]{
        title,
        description,
        image
      }`,
    ),
    fetchTeamPage(client),
  ]);

  if (!legacyMembers.length) {
    console.log("No legacy team documents found — nothing to migrate.");
    return;
  }

  const existingMembers = teamPage?.listing?.members ?? [];
  if (existingMembers.length > 0 && !force) {
    console.log(
      `teamPage already has ${existingMembers.length} members — skipping member seed (use --force to replace).`,
    );
    return;
  }

  const members = legacyMembers.map(toMemberItem).filter(Boolean);
  const categories =
    teamPage?.listing?.categories?.length > 0
      ? teamPage.listing.categories
      : toCategoryItems(DEFAULT_CATEGORIES);

  const hero = teamPage?.hero?.title
    ? teamPage.hero
    : legacyHero?.title
      ? {
          title: legacyHero.title,
          description: legacyHero.description ?? "",
          ...(legacyHero.image?.asset ? { image: legacyHero.image } : {}),
        }
      : teamPage?.hero;

  const listing = {
    eyebrow: teamPage?.listing?.eyebrow?.trim() || DEFAULT_SECTION.eyebrow,
    intro: teamPage?.listing?.intro?.trim() || DEFAULT_SECTION.intro,
    categories,
    members,
  };

  const targetId = teamPage?._id ?? "teamPage";

  if (teamPage?._id) {
    const patch = client.patch(targetId).set({ listing });
    if (hero) {
      patch.set({ hero });
    }
    await patch.commit();
  } else {
    await client.createOrReplace({
      _id: "teamPage",
      _type: "teamPage",
      ...(hero ? { hero } : {}),
      listing,
    });
  }

  console.log(`Seeded teamPage on "${dataset}":`);
  console.log(`  categories: ${categories.length}`);
  console.log(`  members: ${members.length}`);
  console.log("Open Our Team in Studio and publish when ready.");
}

const force = process.argv.includes("--force");

seedTeamPage({ force }).catch((error) => {
  console.error(error);
  process.exit(1);
});
