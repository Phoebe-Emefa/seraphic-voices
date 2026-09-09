import GalleryPage from "@/components/gallery/GalleryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A gallery of performances and moments from Seraphic Voices of Toronto.",
};

export default function Page() {
  return <GalleryPage />;
}
