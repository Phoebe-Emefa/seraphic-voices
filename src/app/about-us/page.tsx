import MissionAndVision from "@/components/about/MissionAndVision";
import Story from "@/components/about/Story";
import { SEO } from "@/components/shared/SEO";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <SEO
        title="About Us"
        description="Excellence, Innovation, and Cultural Collaboration."
        path="/about-us"
      />
      <Story />
      <MissionAndVision />
    </div>
  );
};

export default AboutUs;
