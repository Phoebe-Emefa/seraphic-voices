"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { DONATE_FALLBACK } from "@/data/donateContent";
import { useDonateHero } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { imageSrc } from "../../../sanity/sanity-client";

const DonateHero = () => {
  const heroQuery = useDonateHero();
  const { data } = heroQuery;
  const hero = data?.[0];

  if (isCmsLoading(heroQuery)) {
    return <AboutHeroSkeleton />;
  }

  return (
    <PageHero
      heading={hero?.title || DONATE_FALLBACK.hero.title}
      description={hero?.description || DONATE_FALLBACK.hero.description}
      image={imageSrc(hero?.image?.asset?._ref)}
      alt={hero?.image?.alt}
    />
  );
};

export default DonateHero;
