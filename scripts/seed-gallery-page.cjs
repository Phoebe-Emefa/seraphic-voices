/**
 * Seeds galleryPage from legacy galleryHero, galleryAlbum, and gallery documents.
 *
 * Run: pnpm seed:gallery-page
 */
const { getCliClient } = require("sanity/cli");
const { randomBytes } = require("crypto");

const DEFAULT_SECTION = {
  eyebrow: "In Pictures",
  intro:
    "Browse photos from our performances and celebrations — each album captures a chapter in the story of Seraphic Voices.",
};

const GALLERY_PAGE_IDS = ["drafts.galleryPage", "galleryPage"];

const LEGACY_CATEGORY_LABELS = {
  concerts: "Concerts & Performances",
  rehearsals: "Rehearsals",
  community: "Community & Outreach",
  seasonal: "Seasonal Highlights",
};

function createKey() {
  return randomBytes(6).toString("hex");
}

function toPhotoItem(photo) {
  if (!photo?.image?.asset) {
    return null;
  }

  const item = {
    _key: createKey(),
    _type: "photo",
    image: {
      _type: "image",
      alt: photo.image.alt?.trim() || photo.caption?.trim() || "Seraphic Voices gallery image",
      asset: photo.image.asset,
    },
  };

  if (photo.caption?.trim()) {
    item.caption = photo.caption.trim();
  }

  return item;
}

function toCoverImage(source, fallbackAlt) {
  if (!source?.asset) {
    return null;
  }

  return {
    _type: "image",
    alt: source.alt?.trim() || fallbackAlt,
    asset: source.asset,
  };
}

function toAlbumItem(album, photos) {
  if (!album?.title?.trim()) {
    return null;
  }

  const title = album.title.trim();
  const cover =
    toCoverImage(album.coverImage, title) ||
    toCoverImage(photos[0]?.image, photos[0]?.image?.alt?.trim() || title);

  if (!cover) {
    return null;
  }

  return {
    _key: createKey(),
    _type: "galleryAlbumItem",
    title,
    cover,
    photos,
  };
}

async function fetchGalleryPages(client) {
  return client.fetch(`*[_id in $ids]`, {
    ids: GALLERY_PAGE_IDS,
  });
}

async function fetchGalleryPage(client) {
  const pages = await fetchGalleryPages(client);
  return pages.find((page) => page._id === "drafts.galleryPage") ?? pages[0] ?? null;
}

async function upgradeGalleryPageDocuments(client) {
  const pages = await fetchGalleryPages(client);
  let upgradedCount = 0;

  for (const page of pages) {
    const existingAlbums = page?.listing?.albums ?? [];
    const upgradedAlbums = upgradeAlbumCovers(existingAlbums);
    const needsUpgrade = upgradedAlbums.some((album, index) => {
      const existing = existingAlbums[index];
      return (
        (album?.cover?.asset && !existing?.cover?.asset) ||
        album?._type !== existing?._type
      );
    });

    if (!needsUpgrade || !page?._id) {
      continue;
    }

    await client.patch(page._id).set({ "listing.albums": upgradedAlbums }).commit();
    upgradedCount += 1;
    console.log(`Upgraded albums on ${page._id}.`);
  }

  return upgradedCount;
}

function upgradeAlbumCovers(albums) {
  if (!Array.isArray(albums)) {
    return [];
  }

  return albums.map((album) => {
    const normalized = album?._type === "album"
      ? { ...album, _type: "galleryAlbumItem" }
      : album;

    if (normalized?.cover?.asset) {
      return normalized;
    }

    const title = normalized?.title?.trim() || "Album";
    const cover =
      toCoverImage(normalized?.coverImage, title) ||
      toCoverImage(
        normalized?.photos?.[0]?.image,
        normalized?.photos?.[0]?.image?.alt?.trim() || title,
      );

    if (!cover) {
      return normalized;
    }

    const { coverImage, ...rest } = normalized;
    return { ...rest, cover, _type: "galleryAlbumItem" };
  });
}

async function seedGalleryPage({ force = false } = {}) {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const dataset = client.config().dataset;

  const [legacyAlbums, legacyPhotos, legacyHero, galleryPage] = await Promise.all([
    client.fetch(
      `*[_type == "galleryAlbum"] | order(title asc) {
        _id,
        title,
        coverImage
      }`,
    ),
    client.fetch(
      `*[_type == "gallery"] | order(_createdAt asc) {
        caption,
        category,
        image,
        "albumId": album._ref
      }`,
    ),
    client.fetch(
      `*[_type == "galleryHero"] | order(_updatedAt desc) [0]{
        title,
        description,
        image
      }`,
    ),
    fetchGalleryPage(client),
  ]);

  if (!legacyAlbums.length && !legacyPhotos.length && !legacyHero) {
    console.log("No legacy gallery content found — nothing to migrate.");
    return;
  }

  const upgradedDocuments = await upgradeGalleryPageDocuments(client);
  const existingAlbums = galleryPage?.listing?.albums ?? [];

  if (existingAlbums.length > 0 && !force) {
    if (upgradedDocuments > 0) {
      console.log(`Upgraded album covers on ${upgradedDocuments} gallery page document(s).`);
    } else {
      console.log(
        `galleryPage already has ${existingAlbums.length} albums — skipping seed (use --force to replace).`,
      );
    }
    return;
  }

  const photosByAlbum = new Map();
  for (const photo of legacyPhotos) {
    const albumId = photo.albumId;
    if (!albumId) continue;

    const mapped = toPhotoItem(photo);
    if (!mapped) continue;

    const bucket = photosByAlbum.get(albumId) ?? [];
    bucket.push(mapped);
    photosByAlbum.set(albumId, bucket);
  }

  let albums = legacyAlbums
    .map((album) => toAlbumItem(album, photosByAlbum.get(album._id) ?? []))
    .filter((album) => album && album.cover);

  if (albums.length === 0) {
    const legacyCategoryAlbums = new Map();

    for (const photo of legacyPhotos) {
      if (photo.albumId) continue;

      const mapped = toPhotoItem(photo);
      if (!mapped) continue;

      const category = photo.category?.trim() || "gallery";
      const bucket = legacyCategoryAlbums.get(category) ?? [];
      bucket.push(mapped);
      legacyCategoryAlbums.set(category, bucket);
    }

    albums = Array.from(legacyCategoryAlbums.entries())
      .map(([category, photos]) =>
        toAlbumItem(
          {
            title: LEGACY_CATEGORY_LABELS[category] || category,
          },
          photos,
        ),
      )
      .filter(Boolean);
  }

  const hero = galleryPage?.hero?.title
    ? galleryPage.hero
    : legacyHero?.title
      ? {
          title: legacyHero.title,
          description: legacyHero.description ?? "",
          ...(legacyHero.image?.asset ? { image: legacyHero.image } : {}),
        }
      : galleryPage?.hero;

  const listing = {
    eyebrow: galleryPage?.listing?.eyebrow?.trim() || DEFAULT_SECTION.eyebrow,
    intro: galleryPage?.listing?.intro?.trim() || DEFAULT_SECTION.intro,
    albums,
  };

  const targetId = galleryPage?._id ?? "galleryPage";

  if (galleryPage?._id) {
    const patch = client.patch(targetId).set({ listing });
    if (hero) {
      patch.set({ hero });
    }
    await patch.commit();
  } else {
    await client.createOrReplace({
      _id: "galleryPage",
      _type: "galleryPage",
      ...(hero ? { hero } : {}),
      listing,
    });
  }

  console.log(`Seeded galleryPage on "${dataset}":`);
  console.log(`  albums: ${albums.length}`);
  console.log(`  photos: ${albums.reduce((total, album) => total + album.photos.length, 0)}`);
  console.log("Open Gallery in Studio and publish when ready.");
}

const force = process.argv.includes("--force");

seedGalleryPage({ force }).catch((error) => {
  console.error(error);
  process.exit(1);
});
