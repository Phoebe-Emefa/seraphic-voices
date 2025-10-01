import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
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

const ImageCarousel = ({ content, onSlideChange }: { content: any; onSlideChange?: (index: number) => void }) => {
  const [active, setActive] = useState(0);
  const [isTablet] = useMediaQuery("(max-width: 992px)");
  const [isMobile] = useMediaQuery("(max-width: 750px)");

  const sliderImages = content?.imageSlider?.map((image: any) => {
    return {
      imageSrc: image?.asset?._ref,
      imageAlt: image?.alt,
    };
  });


  return (
    <Flex
      height={"100%"}
      width={{ base: "100%", xl: "70%" }}
      justify={"end"}
    >
      <VStack
        hidden={isMobile}
        // align="left"
        p={12}
        bg="secondary.100"
        height={{ base: "60%", md: "65%", lg: "70%" }}
        position="absolute"
        width={isTablet ? "60%" : "52%"}
        spacing={4}
        left={0}
        bottom={0}
        pl={{ md: "6%" }}
        zIndex={50}
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap={6}
          height="full"
        >
          {active === 0 && (
            <Reveal>
              <Box
                bg="blue.500"
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wide"
                boxShadow="md"
              >
                Upcoming Event
              </Box>
            </Reveal>
          )}
          
          <Reveal>
            <Heading
              as="h1"
              fontSize={{ md: "4xl", lg: "6xl" }}
              color="secondary.700"
            >
              {active === 0 ? "An African Christmas" : content?.title}
            </Heading>
          </Reveal>

          <Reveal>
            <Text fontSize="2xl" textAlign="center">
              {active === 0 ? "Radiance in Toronto - A Black Christmas Celebration." : content?.description}
            </Text>
          </Reveal>

          {active === 0 && (
            <>
              <Reveal>
                <VStack spacing={1} align="center">
                  <Text fontSize="lg" fontWeight="semibold" color="secondary.700">
                    Sat. 6th Dec. 2025
                  </Text>
                  <Text fontSize="md" color="secondary.600">
                    6pm - 9pm
                  </Text>
                  <Text fontSize="md" color="secondary.600" textAlign="center">
                    Christmas Centre Church<br />
                    4545 Jane St, North York
                  </Text>
                </VStack>
              </Reveal>
              
              <Reveal>
                <Link href="/events/an-african-christmas">
                  <CustomButton title="Read more" />
                </Link>
              </Reveal>
            </>
          )}
        </Flex>
      </VStack>

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
          onSlideChange?.(index);
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
