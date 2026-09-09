"use client";

import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import type { GalleryImage } from "@/lib/galleryDisplay";
import { imageSrc } from "../../../sanity/sanity-client";
import { useEffect, useState } from "react";

const CarouselModal = ({
  isOpen,
  closeModal,
  selectedImageIndex,
  images,
}: {
  isOpen: boolean;
  closeModal: () => void;
  selectedImageIndex: number | null;
  images: any[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex ?? 0);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      setCurrentIndex(selectedImageIndex);
    }
  }, [selectedImageIndex]);

  const normalized: GalleryImage[] = images
    .map((item, index) => {
      const url = imageSrc(item?.image?.asset?._ref);
      if (!url) return null;

      return {
        _id: item._id,
        url,
        alt: item?.image?.alt || `Gallery image ${index + 1}`,
        caption: item?.caption,
        albumKey: "gallery",
      };
    })
    .filter(Boolean) as GalleryImage[];

  return (
    <GalleryLightbox
      isOpen={isOpen}
      images={normalized}
      selectedIndex={currentIndex}
      onClose={closeModal}
      onSelect={setCurrentIndex}
    />
  );
};

export default CarouselModal;
