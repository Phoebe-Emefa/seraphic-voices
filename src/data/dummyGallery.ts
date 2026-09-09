import type { GalleryAlbum, GalleryImage } from "@/lib/galleryDisplay";

type DummyPhoto = {
  url: string;
  alt: string;
  caption: string;
};

type DummyAlbumSeed = {
  key: string;
  label: string;
  date: string;
  description?: string;
  photos: DummyPhoto[];
};

const ALBUM_SEEDS: DummyAlbumSeed[] = [
  {
    key: "easter-fest-2025",
    label: "Easter Fest",
    date: "2025-04-20",
    description: "A joyful spring celebration of faith and song.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
        alt: "Choir gathered for an Easter celebration",
        caption: "Opening procession",
      },
      {
        url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
        alt: "Singers rehearsing before the Easter service",
        caption: "Final rehearsal",
      },
      {
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
        alt: "Vocalists in formation during performance",
        caption: "Voices united",
      },
      {
        url: "https://images.unsplash.com/photo-1459749411175-04bf52924ffe?auto=format&fit=crop&w=800&q=80",
        alt: "Conductor leading the ensemble",
        caption: "Under the baton",
      },
      {
        url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80",
        alt: "Wide shot of the Easter concert hall",
        caption: "A full sanctuary",
      },
      {
        url: "https://images.unsplash.com/photo-1571330735069-03abc9ebe4d0?auto=format&fit=crop&w=800&q=80",
        alt: "Choir members warming up",
        caption: "Before the first note",
      },
    ],
  },
  {
    key: "spring-concert-2025",
    label: "Spring Concert",
    date: "2025-05-10",
    description: "An evening of African sacred music and contemporary choral works.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1507839077066-2bb84076cfa8?auto=format&fit=crop&w=1400&q=80",
        alt: "Choir performing on a lit concert stage",
        caption: "Koerner Hall — opening night",
      },
      {
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
        alt: "Ensemble singing under stage lights",
        caption: "Harmony in motion",
      },
      {
        url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80",
        alt: "Wide shot of concert audience and stage",
        caption: "A full house in Toronto",
      },
      {
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
        alt: "Close-up of singers mid-performance",
        caption: "Voices lifted in song",
      },
      {
        url: "https://images.unsplash.com/photo-1520523839897-bd1b69dcd360?auto=format&fit=crop&w=800&q=80",
        alt: "Pianist accompanying vocalists",
        caption: "Piano and voice",
      },
      {
        url: "https://images.unsplash.com/photo-1485579149621-3123dd97985f?auto=format&fit=crop&w=800&q=80",
        alt: "Singers gathered around a piano",
        caption: "Finding the blend",
      },
    ],
  },
  {
    key: "christmas-carols-2024",
    label: "Christmas Carols",
    date: "2024-12-08",
    description: "Beloved carols reimagined with African rhythms and gospel warmth.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=1400&q=80",
        alt: "Choir in festive attire during a Christmas concert",
        caption: "Candlelit finale",
      },
      {
        url: "https://images.unsplash.com/photo-1482517967863-00e85c36b44a?auto=format&fit=crop&w=900&q=80",
        alt: "Holiday lights framing a winter performance",
        caption: "Season of light and song",
      },
      {
        url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80",
        alt: "Festive choral gathering during the holidays",
        caption: "Carols reimagined",
      },
      {
        url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
        alt: "Warm holiday concert atmosphere",
        caption: "Gala evening reception",
      },
      {
        url: "https://images.unsplash.com/photo-1467810563316-b5472e628e2a?auto=format&fit=crop&w=1400&q=80",
        alt: "Wide shot of a seasonal choral performance",
        caption: "Toronto welcomes the season",
      },
      {
        url: "https://images.unsplash.com/photo-1513883043900-63b74d127a21?auto=format&fit=crop&w=800&q=80",
        alt: "Singers in elegant concert dress",
        caption: "Black-tie choral gala",
      },
    ],
  },
  {
    key: "an-african-christmas-2024",
    label: "An African Christmas",
    date: "2024-12-15",
    description: "Our signature holiday celebration at Koerner Hall.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1438032005730-c779502df58b?auto=format&fit=crop&w=1400&q=80",
        alt: "Choir performing at a community gathering",
        caption: "Community concert series",
      },
      {
        url: "https://images.unsplash.com/photo-1523580495183-7f8bbd8cc4c8?auto=format&fit=crop&w=900&q=80",
        alt: "Young singers participating in a workshop",
        caption: "Youth choral workshop",
      },
      {
        url: "https://images.unsplash.com/photo-1529159859430-2753eddaec05?auto=format&fit=crop&w=800&q=80",
        alt: "Community members applauding after a performance",
        caption: "Shared joy after the final note",
      },
      {
        url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=80",
        alt: "Wide shot of a community celebration with music",
        caption: "Music that brings people together",
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        alt: "Collaborative moment during a community event",
        caption: "Partners in song",
      },
      {
        url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
        alt: "Section leaders reviewing sheet music",
        caption: "Sectionals before the concert",
      },
    ],
  },
];

function toDummyAlbum(seed: DummyAlbumSeed): GalleryAlbum {
  const year = new Date(seed.date).getFullYear();

  const images: GalleryImage[] = seed.photos.map((photo, index) => ({
    _id: `dummy-gallery-${seed.key}-${index}`,
    url: photo.url,
    alt: photo.alt,
    caption: photo.caption,
    albumKey: seed.key,
  }));

  return {
    key: seed.key,
    label: seed.label,
    date: seed.date,
    description: seed.description,
    year: Number.isNaN(year) ? undefined : year,
    images,
  };
}

export const DUMMY_GALLERY_ALBUMS: GalleryAlbum[] = ALBUM_SEEDS.map(toDummyAlbum);
