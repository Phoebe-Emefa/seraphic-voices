import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import { Flex } from "@chakra-ui/react";
import React from "react";

const DesktopHero = ({ content }: { content: any}) => {
  


  return (
    <Flex bg="secondary.100" height="100vh" width="100%" overflowX={"hidden"} mt={{md: 20, xl: -16}}>
      <Flex position="relative" width="100%" justify="end">
        <ImageCarousel content={content} />
        
      </Flex>
    </Flex>
  );
};

export default DesktopHero;
