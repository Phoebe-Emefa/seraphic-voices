"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { useEventPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { imageSrc } from "../../../sanity/sanity-client";

const EventsHero = () => {
  const heroQuery = useEventPage();
  const page = heroQuery.data;
  const hero = page?.hero;
  const image = imageSrc(hero?.image?.asset?._ref);

  if (isCmsLoading(heroQuery)) {
    return <AboutHeroSkeleton />;
  }

  if (!hero?.title && !hero?.description && !image) {
    return null;
  }

  return (
    <PageHero
      heading={hero?.title}
      description={hero?.description}
      image={image}
      alt={hero?.image?.alt}
    />
  );
};

export default EventsHero;
