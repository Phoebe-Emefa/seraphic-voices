"use client";

import AboutBelief from "@/components/about/AboutBelief";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutStory from "@/components/about/AboutStory";
import AboutVision from "@/components/about/AboutVision";

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutVision />
      <AboutMission />
      <AboutBelief />
    </>
  );
}
