export type SanityImage = {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
  hotspot?: { x?: number; y?: number };
};

export type HomePageDocument = {
  hero?: {
    headline?: string;
    subheadline?: string;
    ctaTitle?: string;
    ctaHref?: string;
    brandPhotos?: SanityImage[];
    /** @deprecated legacy field name */
    imageSlider?: SanityImage[];
  };
  about?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    image?: SanityImage;
    ctaTitle?: string;
    ctaHref?: string;
  };
  repertoire?: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    ctaTitle?: string;
    ctaHref?: string;
    performances?: RepertoirePerformance[];
  };
  upcomingEvents?: {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    viewAllTitle?: string;
  };
  contact?: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    ctaTitle?: string;
    ctaHref?: string;
  };
};

export type EventPageDocument = {
  hero?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  listing?: {
    ticketButtonLabel?: string;
    detailsLabel?: string;
    eyebrow?: string;
    heading?: string;
    intro?: string;
    upcomingTab?: string;
    pastTab?: string;
    items?: EventDocument[];
  };
  bookingCta?: {
    title?: string;
    body?: string;
    button?: string;
    href?: string;
  };
};

export type EventDocument = {
  _id?: string;
  _key?: string;
  title?: string;
  slug?: { current?: string } | string;
  start_date?: string;
  end_date?: string;
  location?: string;
  image?: SanityImage;
  description?: unknown[] | string;
  ticket_url?: string;
  featured?: boolean;
};

export type RepertoirePerformance = {
  title?: string;
  url?: string;
};

export type WhoWeArePillar = {
  title?: string;
  body?: string;
};

export type WhoWeArePageDocument = {
  hero?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  story?: {
    title?: string;
    blocks?: Array<{
      layout?: "textImage" | "fullWidth" | "imageText";
      content?: unknown[];
      image?: SanityImage;
      taglines?: unknown[];
    }>;
  };
  vision?: {
    eyebrow?: string;
    founderName?: string;
    founderTitle?: string;
    founderImage?: SanityImage;
    content?: unknown[];
    approachPassage?: unknown[];
  };
  mission?: {
    eyebrow?: string;
    statement?: string;
    pillars?: WhoWeArePillar[];
  };
  belief?: {
    text?: string;
  };
};

export type TeamCategoryDocument = {
  _key?: string;
  label?: string;
  value?: string;
};

export type TeamMemberDocument = {
  _id?: string;
  _key?: string;
  name?: string;
  role?: string;
  category?: string;
  image?: SanityImage;
};

export type TeamPageDocument = {
  hero?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  listing?: {
    eyebrow?: string;
    intro?: string;
    categories?: TeamCategoryDocument[];
    members?: TeamMemberDocument[];
  };
};

export type TeamPageQueryResult = {
  page?: TeamPageDocument | null;
};

export type GalleryPhotoDocument = {
  _key?: string;
  caption?: string;
  image?: SanityImage;
};

export type GalleryAlbumDocument = {
  _key?: string;
  title?: string;
  cover?: SanityImage;
  /** @deprecated Renamed to cover */
  coverImage?: SanityImage;
  photos?: GalleryPhotoDocument[];
};

export type GalleryPageDocument = {
  hero?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  listing?: {
    eyebrow?: string;
    intro?: string;
    albums?: GalleryAlbumDocument[];
  };
};

export type GalleryPageQueryResult = {
  page?: GalleryPageDocument | null;
};

export type ContactSocialLinkDocument = {
  _key?: string;
  platform?: string;
  url?: string;
};

export type ContactPageDocument = {
  hero?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  content?: {
    eyebrow?: string;
    intro?: string;
    infoTitle?: string;
    addressLabel?: string;
    address?: string;
    phoneLabel?: string;
    phoneNumber?: string;
    emailLabel?: string;
    email?: string;
    socialLabel?: string;
    socials?: ContactSocialLinkDocument[];
    bookingPrompt?: string;
    bookingLinkLabel?: string;
    bookingLinkHref?: string;
    formTitle?: string;
    formIntro?: string;
    submitLabel?: string;
    emailSubject?: string;
    successTitle?: string;
    successMessage?: string;
    successCloseLabel?: string;
    errorMessage?: string;
  };
};

export type ContactPageQueryResult = {
  page?: ContactPageDocument | null;
};

export type DonateInstructionDocument = {
  _key?: string;
  text?: string;
};

export type DonatePageDocument = {
  hero?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  content?: {
    eyebrow?: string;
    intro?: string;
    impactTitle?: string;
    impactBody?: string;
    ctaLabel?: string;
    ctaHref?: string;
    instructionsTitle?: string;
    instructions?: DonateInstructionDocument[];
  };
};

export type DonatePageQueryResult = {
  page?: DonatePageDocument | null;
};
