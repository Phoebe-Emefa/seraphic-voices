import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IImage {
  imageSrc: string;
  imageAlt: string;
}

const ImageCarousel = ({
  images,
  isLoading,
}: {
  images: string[];
  isLoading?: boolean;
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
      {/* <Box width="100%" bgColor="red">
        <Image
          src="/images/hero-1.jpg"
          alt="The seraphic voices"
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="top"
        />
      </Box> */}
      {/* <Slider {...settings}>
        {images?.map((image) => (
          <Box key={image} height={{ base: "22rem", md: "36rem", xl: "54rem" }}>
            <Image
              src={image}
              alt="The seraphic voices"
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="top"
            />
          </Box>
        ))}
      </Slider> */}
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
            key={image}
            src={image}
            alt="The seraphic voices"
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
