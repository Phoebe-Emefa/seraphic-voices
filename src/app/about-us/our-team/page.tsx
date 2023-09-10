"use client";
import Hero from "@/components/about/Hero";
import TeamMembers from "@/components/about/TeamMembers";
import React from "react";

const OurTeam = () => {
  return (
    <>
      <Hero
        heading=" Meet the Team"
        description="Meet the extraordinary voices behind Seraphic Voices of Toronto! This
          remarkable choir is a powerhouse of passionate musicians dedicated to
          crafting soul-stirring music that transcends boundaries"
      />
      <TeamMembers />
    </>
  );
};

export default OurTeam;
