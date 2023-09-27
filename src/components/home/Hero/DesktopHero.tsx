import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import Reveal from "@/components/shared/Reveal";
import { Flex, Heading, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const DesktopHero = ({ content }: { content: any}) => {
  const [isTablet] = useMediaQuery("(max-width: 992px)");

  const sliderImages = content?.imageSlider?.map((image: any) => {
    return {
      imageSrc: image?.asset?._ref,
      imageAlt: image?.alt,
    };
  });

  return (
    <Flex bg="secondary.100" height="100vh" width="full" mt={-16}>
      <Flex position="relative" width="full" justify="end">
        <ImageCarousel images={sliderImages} />
        <VStack
          align="left"
          p={12}
          bg="secondary.100"
          height={"50%"}
          position="absolute"
          width={isTablet ? "60%" : "52%"}
          spacing={6}
          left={0}
          bottom={0}
          pl={{ md: "2", lg: "6%" }}
        >
         <Reveal>
           <Heading
            as="h1"
            fontSize={{ md: "4xl", lg: "6xl" }}
            color="secondary.700"
          >
            {content?.title}
          </Heading>
         </Reveal>

          <Reveal>
            <Text fontSize="2xl">{content?.description}</Text>
          </Reveal>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default DesktopHero;
