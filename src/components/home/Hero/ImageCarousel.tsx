import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { urlFor } from "../../../../sanity/sanity-client";

interface IImage {
  imageSrc: string;
  imageAlt: string;
}

const ImageCarousel = ({
  images,
}: {
  images: IImage[];
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
          <Image
           key={image?.imageSrc}
            src={urlFor(image?.imageSrc) as unknown as string}
                alt={image?.imageAlt}
            width="100%"
            height={{ base: "22rem", md: "36rem", xl: "100vh" }}
            objectFit="cover"
            objectPosition="top"
          />
        ))}
      </Carousel>
    </Flex>
  );
};

export default ImageCarousel;
