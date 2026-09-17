/**
 * Adds missing `_key` values to contactPage social link arrays.
 *
 * Run: pnpm fix:contact-social-keys
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

const CONTACT_PAGE_IDS = ["contactPage", "drafts.contactPage"];

function createKey() {
  return randomBytes(6).toString("hex");
}

function withSocialKeys(socials = []) {
  return socials.map((social) => ({
    ...social,
    _key: social._key || createKey(),
    _type: social._type || "socialLink",
  }));
}

async function fixContactSocialKeys() {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const docs = await client.fetch(`*[_id in $ids]{ _id, content }`, {
    ids: CONTACT_PAGE_IDS,
  });

  if (!docs.length) {
    console.log(`No contactPage documents found on "${dataset}".`);
    return;
  }

  let patched = 0;

  for (const doc of docs) {
    const socials = doc.content?.socials;
    if (!Array.isArray(socials) || socials.length === 0) continue;

    const needsKeys = socials.some((social) => !social?._key);
    if (!needsKeys) continue;

    await client
      .patch(doc._id)
      .set({
        content: {
          ...doc.content,
          socials: withSocialKeys(socials),
        },
      })
      .commit();

    patched += 1;
    console.log(`Fixed social link keys on ${doc._id}.`);
  }

  if (patched === 0) {
    console.log(`All contactPage social links already have keys on "${dataset}".`);
    return;
  }

  console.log("Refresh Contact in Studio — the social links list should be editable now.");
}

fixContactSocialKeys().catch((error) => {
  console.error(error);
  process.exit(1);
});
