"use client";
import CustomButton from "@/components/shared/CustomButton";
import DataLoader from "@/components/shared/DataLoader";
import Reveal from "@/components/shared/Reveal";
import { SEO } from "@/components/shared/SEO";
import {
  Box,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CarouselModal from "@/app/gallery/CarouselModal";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client, urlFor } from "../../../../sanity/sanity-client";

const Sera5th = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const { isLoading, data } = useQuery("Sera5th", async () => {
    return client.fetch(groq`*[_type == "Sera5th"]`);
  });

  const { data: bannerData, isLoading: bannerDataIsLoading } = useQuery(
    "sera5thHero",
    async () => {
      return client.fetch(groq`*[_type == "sera5thHero" ]`);
    }
  );

  const bannerContent = bannerData?.[0];
  const images = data?.filter((item: any) => item?.image?.asset?._ref != null);


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
      <SEO
        title="Sera5th"
        description="The 5th Anniverasy Celebration of Seraphic Voices of Toronto"
        path="/events/sera5th"
      />
      {isLoading || bannerDataIsLoading ? (
        <DataLoader />
      ) : (
        <>
          <Reveal width="100%">
            <Box>
              <Image
                // src="/images/sera5th-banner.png"
                src={
                  urlFor(bannerContent?.image?.asset?._ref) as unknown as string
                }
                alt={bannerContent?.image?.alt}
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
          </Reveal>

          <Container
            maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
            py={16}
          >
            <Flex justify="center" mb={6}>
              <Link isExternal href={bannerContent?.ticket_url}>
                <CustomButton title="Purchase Ticket" width="12rem" />
              </Link>
            </Flex>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={8}
            >
              {images?.map((item: any, index: any) => (
                <Reveal key={index} width="100%">
                  <motion.div
                    onClick={() => openModal(index)}
                    transition={{ scale: { duration: 0.2 } }}
                    whileHover={{ scale: 1.05 }}
                    layout
                  >
                 <Box height="30rem" width="100%">
                 <Image
                      src={
                        urlFor(item?.image?.asset?._ref) as unknown as string
                      }
                      alt={`Choir Gallery Image ${index + 1}`}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      cursor="pointer"
                      rounded="md"
                    />
                 </Box>
                  </motion.div>
                </Reveal>
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

export default Sera5th;
