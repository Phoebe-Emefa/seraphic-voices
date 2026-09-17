/**
 * One-time migration: copy singleton eventsPage → event (same pattern as home).
 * Requires SANITY_API_WRITE_TOKEN with write access to the dataset.
 *
 * Usage: node scripts/migrate-eventsPage-to-event.mjs
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-20";

if (!projectId || !dataset) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.");
  process.exit(1);
}
if (!token) {
  console.error("Set SANITY_API_WRITE_TOKEN to run this migration.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const legacy = await client.fetch(`*[_id == "eventsPage"][0]`);
const current = await client.fetch(`*[_id == "event"][0]`);

if (!legacy) {
  console.log("No eventsPage document found — nothing to migrate.");
  process.exit(0);
}

if (current?.hero || current?.listing) {
  console.log("event document already has content — skipping.");
  process.exit(0);
}

const { _id, _rev, _type, _createdAt, _updatedAt, ...fields } = legacy;

await client.createOrReplace({
  _id: "event",
  _type: "event",
  ...fields,
});

console.log("Migrated eventsPage → event. Publish in Studio if needed.");
