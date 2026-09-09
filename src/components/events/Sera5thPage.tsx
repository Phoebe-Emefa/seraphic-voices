"use client";

import CustomButton from "@/components/shared/CustomButton";
import Reveal from "@/components/shared/Reveal";
import { Box, Container, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import CarouselModal from "@/app/gallery/CarouselModal";
import { useSera5th, useSera5thHero } from "@/hooks/useCms";
import { isAnyCmsLoading } from "@/hooks/useCmsLoading";
import Sera5thSkeleton from "@/components/events/skeletons/Sera5thSkeleton";
import { imageSrc } from "../../../sanity/sanity-client";
import { useLightbox } from "@/hooks/useLightbox";
import { httpsUrl } from "@/lib/httpsUrl";
import { isPastEvent } from "@/lib/eventDates";

export default function Sera5thPage() {
  const { isOpen, selectedIndex, openAt, close } = useLightbox();
  const reduce = useReducedMotion();
  const sera5thQuery = useSera5th();
  const bannerQuery = useSera5thHero();
  const { data } = sera5thQuery;
  const { data: bannerData } = bannerQuery;
  const bannerContent = bannerData?.[0];
  const images = data?.filter((item: any) => item?.image?.asset?._ref != null) ?? [];
  const ticket = httpsUrl(bannerContent?.ticket_url);
  const archived = bannerContent?.end_date ? isPastEvent(bannerContent) : false;

  if (isAnyCmsLoading(sera5thQuery, bannerQuery)) return <Sera5thSkeleton />;

  return (
    <>
      <Box>
        <Image
          src={imageSrc(bannerContent?.image?.asset?._ref)}
          alt={bannerContent?.image?.alt || "Fifth anniversary"}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>
      <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={16}>
        <Flex justify="center" mb={8} direction="column" align="center" gap={3}>
          {archived ? (
            <Text color="text">Archive of our fifth anniversary celebration.</Text>
          ) : null}
          {ticket && !archived ? (
            <CustomButton title="Purchase ticket" href={ticket} width="12rem" />
          ) : null}
        </Flex>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={8}>
          {images.map((item: any, index: number) => (
            <Reveal key={item._id || index} width="100%">
              <Box
                as="button"
                type="button"
                onClick={() => openAt(index)}
                height="30rem"
                width="100%"
              >
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  style={{ height: "100%" }}
                >
                  <Image
                    src={imageSrc(item?.image?.asset?._ref)}
                    alt={item?.image?.alt || `Anniversary image ${index + 1}`}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    rounded="md"
                  />
                </motion.div>
              </Box>
            </Reveal>
          ))}
        </Grid>
        <CarouselModal isOpen={isOpen} closeModal={close} selectedImageIndex={selectedIndex} images={images} />
      </Container>
    </>
  );
}
