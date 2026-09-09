import HomePage from "@/components/home/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore the fusion of Western and African music, fostering cross-cultural connections",
};

export default function Page() {
  return <HomePage />;
}
