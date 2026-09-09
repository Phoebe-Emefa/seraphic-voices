"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { CONTACT_FALLBACK } from "@/data/contactContent";
import { useContactHero } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { imageSrc } from "../../../sanity/sanity-client";

const ContactHero = () => {
  const heroQuery = useContactHero();
  const { data } = heroQuery;
  const hero = data?.[0];

  if (isCmsLoading(heroQuery)) {
    return <AboutHeroSkeleton />;
  }

  return (
    <PageHero
      heading={hero?.title || CONTACT_FALLBACK.hero.title}
      description={hero?.description || CONTACT_FALLBACK.hero.description}
      image={imageSrc(hero?.image?.asset?._ref)}
      alt={hero?.image?.alt}
    />
  );
};

export default ContactHero;
