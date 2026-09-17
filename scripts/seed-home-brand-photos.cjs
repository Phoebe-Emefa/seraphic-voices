/**
 * Seeds home.hero.brandPhotos (schema type: brandPhoto) and removes legacy hero.imageSlider.
 *
 * Run: pnpm seed:home-slides
 */
const { getCliClient } = require("sanity/cli");

const LEGACY_SLIDES = [
  {
    _key: "3dcef6b74c3b",
    alt: "African Dance",
    asset: {
      _ref: "image-ae5c50bcbca34b807a314b5929290d00eb5bbba0-6720x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "c9504582e748",
    alt: "woman-singing",
    asset: {
      _ref: "image-091e2d6feb6de73e3d5e325860e874e71f04b08c-6720x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "6a9834e4b118",
    alt: "women singing",
    asset: {
      _ref: "image-2aea6542db35fc51cc77dd0ab6424c7e4b4dc57e-6720x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "20c8a2fb3083",
    alt: "man singing",
    asset: {
      _ref: "image-3306c47c4c520c91a39d920b8c9e0b7ab95c7ec7-6720x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "8866f6d5118a",
    alt: "choir leader",
    asset: {
      _ref: "image-ae190677604326dcd89d7b51db071f26e0ba6dd7-6720x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "c1189ea3c65a",
    alt: "men playing trumpet",
    asset: {
      _ref: "image-22437e8e32ebb3e0c600b821e690ef4c0d555f22-6720x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "d55e8452be95",
    alt: "singing",
    asset: {
      _ref: "image-9cda3c612c57e41fa9a3c861de72a27a7e1ccdd1-5310x4480-jpg",
      _type: "reference",
    },
  },
  {
    _key: "61252fe2d5dc",
    alt: "singing-2",
    asset: {
      _ref: "image-631c7ce3935ec8668235f94f0a26999cced8a33f-6720x3534-jpg",
      _type: "reference",
    },
  },
];

function toBrandPhotos(slides) {
  return slides.map(({ _key, alt, asset }) => ({
    _key,
    _type: "brandPhoto",
    alt,
    asset,
  }));
}

const HOME_IDS = ["home", "drafts.home"];

async function patchHomeDocument(client, documentId, brandPhotos) {
  const existing = await client.fetch(`*[_id == $id][0]{ _id }`, { id: documentId });

  if (!existing?._id) {
    if (documentId === "home") {
      await client.createOrReplace({
        _id: "home",
        _type: "home",
        hero: { brandPhotos },
      });
      console.log(`Created home with ${brandPhotos.length} brandPhotos.`);
      return;
    }
    console.log(`Skipped ${documentId} (document does not exist).`);
    return;
  }

  await client
    .patch(documentId)
    .set({ "hero.brandPhotos": brandPhotos })
    .unset(["hero.imageSlider"])
    .commit();

  console.log(`Patched ${documentId}: brandPhotos=${brandPhotos.length}, removed hero.imageSlider.`);
}

async function seedHomeBrandPhotos() {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;
  const brandPhotos = toBrandPhotos(LEGACY_SLIDES);

  for (const documentId of HOME_IDS) {
    await patchHomeDocument(client, documentId, brandPhotos);
  }

  console.log(`Done on dataset "${dataset}". Refresh Studio (Published + Draft).`);
}

seedHomeBrandPhotos().catch((error) => {
  console.error(error);
  process.exit(1);
});
