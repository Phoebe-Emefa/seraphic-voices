import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { urlFor } from "../../../../sanity/sanity-client";
import Reveal from "@/components/shared/Reveal";

interface IImage {
  imageSrc: string;
  imageAlt: string;
}

const ImageCarousel = ({ images }: { images: IImage[] }) => {

  return (
    <Flex height={"full"} width={{ base: "100%", md: "70%" }} justify="end">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        infiniteLoop
        autoPlay
        transitionTime={200}
        emulateTouch={true}
        interval={5000}
      >
        {images?.map((image) => (
          <Reveal key={image?.imageSrc}>
            <Image
              src={urlFor(image?.imageSrc) as unknown as string}
              alt={image?.imageAlt}
              width="100%"
              height={{ base: "22rem", md: "36rem", xl: "100vh" }}
              objectFit="cover"
              objectPosition="top"
            />
          </Reveal>
        ))}
      </Carousel>
    </Flex>
  );
};

export default ImageCarousel;
