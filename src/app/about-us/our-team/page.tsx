"use client";
import Hero from "@/components/about/Hero";
import TeamMembers from "@/components/about/TeamMembers";
import { SEO } from "@/components/shared/SEO";
import React from "react";
import { useQuery } from "react-query";
import { client, urlFor } from "../../../../sanity/sanity-client";
import { groq } from "next-sanity";
import DataLoader from "@/components/shared/DataLoader";
import Reveal from "@/components/shared/Reveal";

const OurTeam = () => {
  const { data, isLoading } = useQuery("teamHero", async () => {
    return client.fetch(groq`*[_type == "teamHero" ]`);
  });

  const heroContent = data?.[0];
  return (
    <>
      <SEO
        title="Our Team"
        description="Passionate musicians crafting boundary-breaking music."
        path="/about-us/our-team"
      />
      {isLoading ? (
        <DataLoader />
      ) : (
        <>
          <Reveal width="100%" height={{ base: "100%", xl: "28rem" }}>
            <Hero
              heading={heroContent?.title}
              description={heroContent?.description}
              image={
                heroContent?.image &&
                (urlFor(heroContent?.image?.asset?._ref) as unknown as string)
              }
              alt={heroContent?.image?.alt}
            />
          </Reveal>
          <TeamMembers />
        </>
      )}
    </>
  );
};

export default OurTeam;
