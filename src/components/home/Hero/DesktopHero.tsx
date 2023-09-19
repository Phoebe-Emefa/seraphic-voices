import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import { Flex, Heading, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import React from "react";

export   const sliderImages = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
    "/images/hero-5.jpg",
    "/images/hero-6.jpg",
    "/images/hero-7.jpg",
    "/images/hero-8.jpg",
    "/images/hero-9.jpg",
  ];
const DesktopHero = () => {
  const [isTablet] = useMediaQuery("(max-width: 992px)");

  //   const sliderImages = heroContent?.imageSlider?.map((image: any) => {
  //     return {
  //       imageSrc: image?.asset?._ref,
  //       imageAlt: image?.alt
  //     };
  //   });



  return (
    <Flex bg="secondary.100" height="100vh" width="full" mt={-16} >
      <Flex position="relative"  width="full" justify="end" >
        <ImageCarousel images={sliderImages} />
        <VStack
          align="left"
          p={12}
          bg="secondary.100"
          height={'50%'}
          position="absolute"
          width={isTablet ? "60%" : "45%"}
          spacing={6}
          left={0}
          bottom={0}
          pl={{ md: "2", lg: "6%" }}
        >
          <Heading
            as="h1"
            fontSize={{ md: "4xl", lg: "6xl" }}
            color="secondary.700"
          >
            Harmonizing Cultures, Elevating Hearts
          </Heading>

          <Text fontSize="2xl">
            Explore the fusion of Western and African music, fostering
            cross-cultural connections{" "}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default DesktopHero;
