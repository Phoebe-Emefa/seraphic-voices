/**
 * One-off diagnostic: prints which Events CMS fields are present.
 * Usage: node scripts/inspect-event-page.mjs
 * Loads NEXT_PUBLIC_* from .env.local via dotenv-free manual parse.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-20";

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local");
  process.exit(1);
}

const query = `coalesce(
  *[_id == "event"][0],
  *[_id == "eventsPage"][0]
){
  _id,
  _type,
  _updatedAt,
  hero,
  listing,
  bookingCta
}`;

async function fetchWithCdn(useCdn) {
  const client = createClient({ projectId, dataset, apiVersion, useCdn });
  return client.fetch(query);
}

function summarize(doc) {
  if (!doc) return { found: false };
  const listing = doc.listing ?? {};
  const items = listing.items ?? [];
  return {
    found: true,
    _id: doc._id,
    _type: doc._type,
    _updatedAt: doc._updatedAt,
    hero: {
      title: doc.hero?.title ?? null,
      hasDescription: Boolean(doc.hero?.description),
      hasImage: Boolean(doc.hero?.image?.asset),
    },
    listing: {
      eyebrow: listing.eyebrow ?? null,
      heading: listing.heading ?? null,
      intro: listing.intro ? `${listing.intro.slice(0, 60)}...` : null,
      upcomingTab: listing.upcomingTab ?? null,
      pastTab: listing.pastTab ?? null,
      ticketButtonLabel: listing.ticketButtonLabel ?? null,
      detailsLabel: listing.detailsLabel ?? null,
      itemCount: items.length,
      itemTitles: items.map((i) => i.title).filter(Boolean),
    },
    bookingCta: {
      title: doc.bookingCta?.title ?? null,
    },
  };
}

const [cdnDoc, apiDoc] = await Promise.all([
  fetchWithCdn(true),
  fetchWithCdn(false),
]);

console.log(JSON.stringify({
  dataset,
  projectId,
  cdn: summarize(cdnDoc),
  api: summarize(apiDoc),
  cdnMatchesApi: JSON.stringify(summarize(cdnDoc)) === JSON.stringify(summarize(apiDoc)),
}, null, 2));
