import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { urlFor } from "../../../sanity/sanity-client";
import Reveal from "@/components/shared/Reveal";

const TeamCard = ({ item }: { item: any }) => {
  return (
    <Reveal>
      <VStack>
        <Box
          width={{ base: "8rem", md: "12rem" }}
          height={{ base: "8rem", md: "12rem" }}
        >
          <Image
            src={
              item?.image &&
              (urlFor(item?.image?.asset?._ref) as unknown as string)
            }
            alt={item?.image?.alt}
            rounded="full"
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="top"
          />
        </Box>
        <Heading as="h4" fontSize="xl" textAlign="center" fontWeight={500}>
          {item?.name}
        </Heading>
      </VStack>
    </Reveal>
  );
};

export default TeamCard;
