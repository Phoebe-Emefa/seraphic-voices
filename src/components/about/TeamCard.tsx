import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";

const TeamCard = ({
  item,
}: {
  item: {
    image: string;
    name: string;
  };
}) => {
  return (
    <VStack>
      <Box width="12rem" height="12rem">
        <Image
          src={item?.image}
          alt="team mate name"
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
  );
};

export default TeamCard;
