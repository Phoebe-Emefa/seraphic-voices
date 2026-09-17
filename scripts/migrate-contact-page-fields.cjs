/**
 * Adds newer contactPage content fields without overwriting existing copy.
 *
 * Run: pnpm migrate:contact-page-fields
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

const CONTACT_PAGE_IDS = ["contactPage", "drafts.contactPage"];

const FIELD_DEFAULTS = {
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

function mergeContent(existing = {}) {
  const next = { ...existing };

  for (const [field, value] of Object.entries(FIELD_DEFAULTS)) {
    if (!String(next[field] ?? "").trim()) {
      next[field] = value;
    }
  }

  if (Array.isArray(next.socials)) {
    next.socials = withSocialKeys(next.socials);
  }

  return next;
}

async function migrateContactPageFields() {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const docs = await client.fetch(`*[_id in $ids]{ _id, content }`, {
    ids: CONTACT_PAGE_IDS,
  });

  if (!docs.length) {
    console.log(`No contactPage documents found on "${dataset}". Run pnpm seed:contact-page first.`);
    return;
  }

  let patched = 0;

  for (const doc of docs) {
    const merged = mergeContent(doc.content);
    const changed = JSON.stringify(merged) !== JSON.stringify(doc.content ?? {});
    if (!changed) continue;

    await client.patch(doc._id).set({ content: merged }).commit();
    patched += 1;
    console.log(`Updated ${doc._id}.`);
  }

  if (patched === 0) {
    console.log(`contactPage fields are already up to date on "${dataset}".`);
    return;
  }

  console.log("Publish Contact in Studio when ready.");
}

migrateContactPageFields().catch((error) => {
  console.error(error);
  process.exit(1);
});
