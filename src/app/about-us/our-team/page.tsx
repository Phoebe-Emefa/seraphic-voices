import OurTeamPage from "@/components/about/OurTeamPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Passionate musicians crafting boundary-breaking music.",
};

export default function Page() {
  return <OurTeamPage />;
}
