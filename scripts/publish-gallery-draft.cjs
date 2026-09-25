/**
 * Copies drafts.galleryPage listing (and hero if missing on published) to galleryPage.
 * Use when Studio shows the right content but the live site does not.
 *
 * Run: pnpm publish:gallery-draft
 */
const { getCliClient } = require("sanity/cli");

async function publishGalleryDraft() {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const [draft, published] = await Promise.all([
    client.fetch(`*[_id == "drafts.galleryPage"][0]`),
    client.fetch(`*[_id == "galleryPage"][0]`),
  ]);

  if (!draft?.listing) {
    console.log("No drafts.galleryPage listing found.");
    return;
  }

  const patch = client.patch("galleryPage").set({ listing: draft.listing });
  if (draft.hero) {
    patch.set({ hero: draft.hero });
  }

  if (published?._id) {
    await patch.commit();
  } else {
    await client.createOrReplace({
      _id: "galleryPage",
      _type: "galleryPage",
      hero: draft.hero,
      listing: draft.listing,
    });
  }

  const title = draft.listing?.albums?.[0]?.title ?? "(no albums)";
  console.log(`Published galleryPage on "${dataset}". First album: "${title}"`);
}

publishGalleryDraft().catch((error) => {
  console.error(error);
  process.exit(1);
});
