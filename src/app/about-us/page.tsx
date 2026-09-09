import AboutUsPage from "@/components/about/AboutUsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the vision, mission, and story behind Seraphic Voices of Toronto.",
};

export default function AboutUs() {
  return <AboutUsPage />;
}
