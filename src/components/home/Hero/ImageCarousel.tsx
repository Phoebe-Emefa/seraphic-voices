import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface IImage {
  imageSrc: string;
  imageAlt: string;
}

const ImageCarousel = ({
  images,
  isLoading
}: {
  images: string[];
  isLoading?: boolean;
}) => {
  return (
    <Flex width={{ base: '92%', md: '70%' }}>
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
        {images?.map(image => (
            <Box  key={image} height={{ base: '22rem', md: '36rem', xl: '54rem' }}>
              <Image
                // src={urlFor(image?.imageSrc) as unknown as string}
                src={image}
                alt="The seraphic voices"
                width="100%"
                height="100%"
                objectFit="cover"
                objectPosition="bottom"
              />
            </Box>
        ))}
      </Carousel>
    </Flex>
  );
};

export default ImageCarousel;
