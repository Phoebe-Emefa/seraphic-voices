/**
 * Imports legacy standalone `events` documents into Events → Listing → Concerts.
 *
 * Run: pnpm seed:events-concerts
 * Replace existing concerts: pnpm seed:events-concerts -- --force
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

const EVENT_PAGE_IDS = ["drafts.event", "event"];

const LEGACY_QUERY = `*[_type == "events"] | order(start_date asc) {
  title,
  start_date,
  end_date,
  location,
  image,
  description,
  ticket_url,
  featured
}`;

function createKey() {
  return randomBytes(6).toString("hex");
}

function copyImage(image) {
  if (!image?.asset) return undefined;
  const copied = {
    _type: "image",
    asset: image.asset,
  };
  if (image.alt) copied.alt = image.alt;
  if (image.hotspot) copied.hotspot = image.hotspot;
  if (image.crop) copied.crop = image.crop;
  return copied;
}

function toConcertItem(legacy) {
  if (!legacy?.title?.trim()) return null;

  const item = {
    _key: createKey(),
    _type: "concert",
    title: legacy.title.trim(),
    start_date: legacy.start_date,
    end_date: legacy.end_date,
    location: legacy.location?.trim() || "Toronto, ON",
    featured: legacy.featured === true,
  };

  const image = copyImage(legacy.image);
  if (image) item.image = image;

  if (legacy.ticket_url?.trim()) item.ticket_url = legacy.ticket_url.trim();
  if (Array.isArray(legacy.description) && legacy.description.length > 0) {
    item.description = legacy.description;
  }

  return item;
}

async function fetchEventPage(client) {
  return client.fetch(`*[_id in $ids] | order(_id asc) [0]`, {
    ids: EVENT_PAGE_IDS,
  });
}

async function seedEventsConcerts({ force = false } = {}) {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const [legacyEvents, eventPage] = await Promise.all([
    client.fetch(LEGACY_QUERY),
    fetchEventPage(client),
  ]);

  if (!legacyEvents.length) {
    console.log("No legacy events documents found — nothing to import.");
    return;
  }

  const existingItems = eventPage?.listing?.items ?? [];
  if (existingItems.length > 0 && !force) {
    console.log(
      `Events listing already has ${existingItems.length} concerts — skipping (use --force to replace).`,
    );
    return;
  }

  const items = legacyEvents.map(toConcertItem).filter(Boolean);
  if (!items.length) {
    console.log("Legacy events found but none had enough data to import.");
    return;
  }

  const listing = {
    ...(eventPage?.listing ?? {}),
    items,
  };

  const targetId = eventPage?._id ?? "drafts.event";

  if (eventPage?._id) {
    await client.patch(targetId).set({ listing }).commit();
  } else {
    await client.create({
      _id: "drafts.event",
      _type: "event",
      listing,
    });
  }

  console.log(`Imported concerts on "${dataset}":`);
  console.log(`  concerts: ${items.length}`);
  items.forEach((item) => {
    console.log(`  - ${item.title}`);
  });
  console.log("Open Events → Listing in Studio (Draft tab), review, and publish.");
}

const force = process.argv.includes("--force");

seedEventsConcerts({ force }).catch((error) => {
  console.error(error);
  process.exit(1);
});
