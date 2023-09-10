
import ImageCarousel from '@/components/home/Hero/ImageCarousel';
import { Flex, Heading, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';


const DesktopHero = () => {


  const [isTablet] = useMediaQuery('(max-width: 992px)');


//   const sliderImages = heroContent?.imageSlider?.map((image: any) => {
//     return {
//       imageSrc: image?.asset?._ref,
//       imageAlt: image?.alt
//     };
//   });

  const sliderImages =["/images/choir-1.jpg", "/images/choir-2.jpg", "/images/choir-3.jpg"]

  return (
    <Flex bg="secondary.100" mt={isTablet ? 0 : -40}>
      <Flex position="relative" justify="flex-end">
        <ImageCarousel images={sliderImages}  />
        <VStack
          align="left"
          p={12}
          bg="secondary.100"
          position="absolute"
          width={isTablet ? '60%' : '45%'}
          spacing={6}
          left={0}
          bottom={0}
          ml={{ md: '2', lg: '6%' }}
        >
            <Heading
              as="h1"
              fontSize={{ md: '4xl', lg: '6xl' }}
              color="secondary.700"
            >
             Harmonizing Cultures, Elevating Hearts
            </Heading>
       
            <Text fontSize="2xl">Explore the fusion of Western and African music, fostering cross-cultural connections </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default DesktopHero;
