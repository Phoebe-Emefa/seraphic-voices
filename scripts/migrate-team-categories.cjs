/**
 * Strips legacy category `value` fields and normalizes member categories to labels.
 *
 * Run: pnpm migrate:team-categories
 */
const { getCliClient } = require("sanity/cli");

const TEAM_PAGE_IDS = ["drafts.teamPage", "teamPage"];

const CATEGORY_ALIASES = {
  Conductor: "Choir Conductor",
  "Choir conductor": "Choir Conductor",
};

function sanitizeCategory(category) {
  const label = category?.label?.trim() || category?.value?.trim();
  if (!label) {
    return null;
  }

  return {
    _key: category._key,
    _type: category._type || "category",
    label,
  };
}

function resolveMemberCategory(memberCategory, sourceCategories) {
  const raw = String(memberCategory ?? "").trim();
  if (!raw) {
    return raw;
  }

  for (const category of sourceCategories) {
    const label = category?.label?.trim();
    const legacy = category?.value?.trim();
    if (raw === label || raw === legacy) {
      return label || legacy;
    }
  }

  return CATEGORY_ALIASES[raw] ?? raw;
}

function categoriesNeedMigration(categories) {
  if (!Array.isArray(categories)) {
    return false;
  }

  return categories.some((category) => "value" in (category ?? {}));
}

async function migrateTeamCategories() {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;
  const teamPage = await client.fetch(`*[_id in $ids] | order(_id asc) [0]`, {
    ids: TEAM_PAGE_IDS,
  });

  if (!teamPage?._id) {
    console.log("No teamPage document found.");
    return;
  }

  const sourceCategories = teamPage.listing?.categories ?? [];
  const categories = sourceCategories.map(sanitizeCategory).filter(Boolean);
  const members = (teamPage.listing?.members ?? []).map((member) => ({
    ...member,
    category: resolveMemberCategory(member.category, sourceCategories),
  }));

  const membersChanged = (teamPage.listing?.members ?? []).some(
    (member, index) => member.category !== members[index]?.category,
  );

  if (!categoriesNeedMigration(sourceCategories) && !membersChanged) {
    console.log("Team categories are already migrated.");
    return;
  }

  await client
    .patch(teamPage._id)
    .set({
      listing: {
        ...teamPage.listing,
        categories,
        members,
      },
    })
    .commit();

  console.log(`Migrated team categories on "${dataset}":`);
  console.log(`  categories: ${categories.length}`);
  console.log(`  members updated: ${membersChanged ? "yes" : "no"}`);
  console.log("Refresh Studio and publish when ready.");
}

migrateTeamCategories().catch((error) => {
  console.error(error);
  process.exit(1);
});
