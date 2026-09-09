"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { ABOUT_US_FALLBACK } from "@/data/aboutUsContent";
import { useWhoWeAreHero } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { imageSrc } from "../../../sanity/sanity-client";

const AboutHero = () => {
  const heroQuery = useWhoWeAreHero();
  const { data } = heroQuery;
  const hero = data?.[0];

  if (isCmsLoading(heroQuery)) {
    return <AboutHeroSkeleton />;
  }

  return (
    <PageHero
      heading={hero?.title || ABOUT_US_FALLBACK.hero.title}
      description={hero?.description || ABOUT_US_FALLBACK.hero.description}
      image={imageSrc(hero?.image?.asset?._ref)}
      alt={hero?.image?.alt}
    />
  );
};

export default AboutHero;
