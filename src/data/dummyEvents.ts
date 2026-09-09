/** Single placeholder for the common one-event home layout preview. */
export const DUMMY_SINGLE_EVENT = {
  _id: "dummy-1",
  title: "An African Christmas",
  slug: { current: "an-african-christmas" },
  start_date: "2026-12-06T19:30:00-05:00",
  end_date: "2026-12-06T21:30:00-05:00",
  location: "Koerner Hall, Toronto",
  image: {
    asset: { _ref: "" },
    alt: "Seraphic Voices performing An African Christmas",
  },
  imageUrl: "https://picsum.photos/seed/seraphic-christmas/1200/900",
  ticket_url: "https://www.example.com/tickets",
  description: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text:
            "Celebrate the season with Seraphic Voices of Toronto in a vibrant evening of African and diasporic Christmas music — from soulful spirituals to joyful gospel arrangements and contemporary choral works.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text:
            "Under the direction of our artistic leadership, the ensemble brings together over forty voices in a program designed to honour tradition while welcoming every listener into the warmth of the holidays.",
        },
      ],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "Program highlights" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text:
            "Expect beloved carols reimagined with African rhythms, original compositions, and a finale that invites the audience to sing along. Doors open one hour before the performance.",
        },
      ],
    },
  ],
};

/** Placeholder events for multi-event layout preview. */
export const DUMMY_UPCOMING_EVENTS = [
  DUMMY_SINGLE_EVENT,
  {
    _id: "dummy-2",
    title: "Carols by Candlelight",
    slug: { current: "carols-by-candlelight" },
    start_date: "2026-12-20T17:00:00-05:00",
    end_date: "2026-12-20T19:00:00-05:00",
    location: "St. James Cathedral, Toronto",
    image: {
      asset: { _ref: "" },
      alt: "Candlelit choral performance",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1507839077066-2bb84076cfa8?auto=format&fit=crop&w=1200&q=80",
    ticket_url: "https://www.example.com/tickets/candlelight",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text:
              "An intimate candlelit service of seasonal music in one of Toronto's most historic sacred spaces.",
          },
        ],
      },
    ],
  },
  {
    _id: "dummy-3",
    title: "Voices of Spring Gala",
    slug: { current: "voices-of-spring-gala" },
    start_date: "2027-03-15T19:00:00-05:00",
    end_date: "2027-03-15T21:00:00-05:00",
    location: "Roy Thomson Hall, Toronto",
    image: {
      asset: { _ref: "" },
      alt: "Spring gala concert",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    ticket_url: "https://www.example.com/tickets/spring-gala",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text:
              "Our annual spring gala featuring guest soloists and a full orchestral accompaniment.",
          },
        ],
      },
    ],
  },
] as const;

export const DUMMY_PAST_EVENTS = [
  {
    _id: "dummy-past-1",
    title: "SERA 5th Anniversary Concert",
    slug: { current: "sera-5th-anniversary" },
    start_date: "2025-09-14T18:00:00-05:00",
    end_date: "2025-09-14T20:30:00-05:00",
    location: "Koerner Hall, Toronto",
    image: {
      asset: { _ref: "" },
      alt: "SERA 5th anniversary concert",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text:
              "A milestone evening celebrating five years of Seraphic Voices with guest artists and a full programme of African sacred and choral favourites.",
          },
        ],
      },
    ],
  },
  {
    _id: "dummy-past-2",
    title: "Summer Gospel Night",
    slug: { current: "summer-gospel-night" },
    start_date: "2025-07-19T19:00:00-05:00",
    end_date: "2025-07-19T21:00:00-05:00",
    location: "Harbourfront Centre, Toronto",
    image: {
      asset: { _ref: "" },
      alt: "Outdoor summer gospel concert",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf52924ffe?auto=format&fit=crop&w=1200&q=80",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text:
              "An open-air evening of gospel, spirituals, and joyful choral music along the waterfront.",
          },
        ],
      },
    ],
  },
  {
    _id: "dummy-past-3",
    title: "Easter Resurrection Service",
    slug: { current: "easter-resurrection-service" },
    start_date: "2025-04-20T10:00:00-05:00",
    end_date: "2025-04-20T12:00:00-05:00",
    location: "St. Michael's Cathedral, Toronto",
    image: {
      asset: { _ref: "" },
      alt: "Easter choral service",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1438032005730-c779502df58b?auto=format&fit=crop&w=1200&q=80",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text:
              "A sacred morning of resurrection hymns, African worship songs, and reflective choral anthems.",
          },
        ],
      },
    ],
  },
  {
    _id: "dummy-past-4",
    title: "New Year Choral Celebration",
    slug: { current: "new-year-choral-celebration" },
    start_date: "2025-01-04T19:30:00-05:00",
    end_date: "2025-01-04T21:30:00-05:00",
    location: "Roy Thomson Hall, Toronto",
    image: {
      asset: { _ref: "" },
      alt: "New Year choral celebration",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text:
              "Ring in the new year with an uplifting programme of hymns, contemporary worship, and choral classics.",
          },
        ],
      },
    ],
  },
] as const;
