const { getCliClient } = require("sanity/cli");

async function main() {
  const client = getCliClient({ apiVersion: "2023-09-20" });
  const pages = await client.fetch(`*[_id in ["drafts.galleryPage", "galleryPage"]]{
    _id,
    "albumCount": count(listing.albums),
    "firstAlbumTitle": listing.albums[0].title,
    "hasCover": defined(listing.albums[0].cover.asset),
    "photoCount": count(listing.albums[0].photos),
    hero
  }`);
  console.log(JSON.stringify(pages, null, 2));
}

main().catch(console.error);
