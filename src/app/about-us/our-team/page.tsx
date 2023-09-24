"use client";
import Hero from "@/components/about/Hero";
import TeamMembers from "@/components/about/TeamMembers";
import { SEO } from "@/components/shared/SEO";
import React from "react";

const OurTeam = () => {
  return (
    <>
      <SEO
        title="Our Team"
        description="Passionate musicians crafting boundary-breaking music."
        path="/about-us/our-team"
      />
      <Hero
        heading=" Meet the Team"
        description="Meet the extraordinary voices behind Seraphic Voices of Toronto! This
          remarkable choir is a powerhouse of passionate musicians dedicated to
          crafting soul-stirring music that transcends boundaries"
        image="/images/group.jpg"
      />
      <TeamMembers />
    </>
  );
};

export default OurTeam;
