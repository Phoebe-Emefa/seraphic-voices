"use client";
import { Grid, Image, useDisclosure, Container } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/about/Hero";
import CarouselModal from "@/app/gallery/CarouselModal";
import { useQuery } from "react-query";
import { client, urlFor } from "../../../sanity/sanity-client";
import { groq } from "next-sanity";
import DataLoader from "@/components/shared/DataLoader";
import { SEO } from "@/components/shared/SEO";
import Reveal from "@/components/shared/Reveal";

const Gallery = () => {
  const { isLoading, data } = useQuery("gallery", async () => {
    return client.fetch(groq`*[_type == "gallery"]`);
  });

  const { data: heroGallery, isLoading: heroIsLoading } = useQuery(
    "galleryHero", async () => {
      return client.fetch(groq`*[_type == "galleryHero" ]`);
    }
  );

  const heroContent = heroGallery?.[0];

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

  const images = data?.filter((item: any) => item?.image?.asset?._ref != null);

  return (
    <>
      {isLoading || heroIsLoading ? (
        <DataLoader />
      ) : (
        <>
          <SEO
            title="Gallery"
            description="Explore a captivating gallery that captures the essence of our choir's musical journey, from stage performances to behind-the-scenes moments."
            path="/gallery"
          />
          <Reveal width="100%" height={{ base: "100%", xl: "28rem" }}>
            <Hero
              heading={heroContent?.title}
              description={heroContent?.description}
              image={
                heroContent?.image &&
                (urlFor(heroContent?.image?.asset?._ref) as unknown as string)
              }
              alt={heroContent?.image?.alt}
            />
          </Reveal>
          <Container
            maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
            py={16}
          >
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              {images?.map((item: any, index: any) => (
                <motion.div
                  key={index}
                  onClick={() => openModal(index)}
                  transition={{ scale: { duration: 0.2 } }}
                  whileHover={{ scale: 1.05 }}
                  layout
                >
                  <Image
                    src={urlFor(item?.image?.asset?._ref) as unknown as string}
                    alt={`Choir Gallery Image ${index + 1}`}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    cursor="pointer"
                    rounded="md"
                  />
                </motion.div>
              ))}
            </Grid>
            <CarouselModal
              {...{ isOpen, closeModal, selectedImageIndex, images }}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Gallery;
