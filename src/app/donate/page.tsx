import DonatePage from "@/components/donate/DonatePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Seraphic Voices of Toronto. Your contribution helps the choir serve the community.",
};

export default function Page() {
  return <DonatePage />;
}
