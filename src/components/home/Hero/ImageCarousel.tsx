import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  keyframes,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { urlFor } from "../../../../sanity/sanity-client";
import Reveal from "@/components/shared/Reveal";
import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";

interface IImage {
  imageSrc: string;
  imageAlt: string;
}

const ImageCarousel = ({ content }: { content: any }) => {
  const [active, setActive] = useState(0);
  const [isTablet] = useMediaQuery("(max-width: 992px)");
  const [isMobile] = useMediaQuery("(max-width: 750px)");

  const sliderImages = content?.imageSlider?.map((image: any) => {
    return {
      imageSrc: image?.asset?._ref,
      imageAlt: image?.alt,
    };
  });

  const bounce = keyframes`
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  `;

  return (
    <Flex
      height={"100%"}
      width={{ base: "100%", xl: active === 0 ? "100%" : "70%" }}
      justify={"end"}
    >
      <VStack
        hidden={isMobile || active === 0}
        // align="left"
        p={12}
        bg="secondary.100"
        height={"50%"}
        position="absolute"
        width={isTablet ? "60%" : "52%"}
        spacing={6}
        left={0}
        bottom={0}
        pl={{ md: "6%" }}
        zIndex={50}
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap={10}
          height="full"
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
        </Flex>
      </VStack>
      {active === 0 && (
        <Box
          position={"absolute"}
          zIndex={50}
          left={{ base: "32%", md: "40%", xl: "45%" }}
          transform="translateX(-50%)"
          bottom={{ base: 10, md: 48, xl: 20 }}
          animation={`${bounce} 1s infinite;`}
        >
          <Link href="/events/sera5th">
            <CustomButton title="Learn More" />
          </Link>
        </Box>
      )}

      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        infiniteLoop
        autoPlay
        transitionTime={200}
        emulateTouch={true}
        interval={10000}
        onChange={(index) => {
          setActive(index);
        }}
      >
        {sliderImages?.map((image: IImage) => (
          <Reveal key={image?.imageSrc} width={"100%"}>
            <Image
              alignSelf={"flex-end"}
              src={urlFor(image?.imageSrc) as unknown as string}
              alt={image?.imageAlt}
              width={"100%"}
              height={{ base: "22rem", md: "100vh" }}
              // height={{ base: "22rem", md: "36rem", xl: "100vh" }}
              objectFit="cover"
              // objectPosition="right"
            />
          </Reveal>
        ))}
      </Carousel>
    </Flex>
  );
};

export default ImageCarousel;
