"use client";
import { Grid, Image, useDisclosure, Container } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/about/Hero";
import CarouselModal from "@/app/gallery/CarouselModal";

const images = [
  "/images/group.jpg",
  "/images/hero-9.jpg",
  "/images/hero-1.jpg",
  "/images/group.jpg",
  "/images/hero-9.jpg",
  "/images/hero-1.jpg",
  "/images/group.jpg",
  "/images/hero-9.jpg",
  "/images/hero-1.jpg",
];

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    onOpen();
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    onClose();
  };

  return (
    <>
      <Hero
        heading="Explore Our Captivating Gallery"
        description=" Explore a captivating gallery that captures the essence of our choir's musical journey, from stage performances to behind-the-scenes moments."
        image="images/group-2.jpg"
      />
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
        py={16}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              onClick={() => openModal(index)}
              transition={{ scale: { duration: 0.2 } }}
              whileHover={{ scale: 1.05 }}
              layout
            >
              <Image
                src={image}
                alt={`Choir Gallery Image ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
                cursor="pointer"
              />
            </motion.div>
          ))}
        </Grid>
        <CarouselModal
          {...{ isOpen, closeModal, selectedImageIndex, images }}
        />
      </Container>
    </>
  );
};

export default Gallery;
