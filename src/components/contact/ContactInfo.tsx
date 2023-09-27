import Reveal from "@/components/shared/Reveal";
import { contactInfo } from "@/utils/misc";
import { Box, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { groq } from "next-sanity";
import React from "react";
import { useQuery } from "react-query";
import { client } from "../../../sanity/sanity-client";

const ContactInfo = () => {

    const { data: heroContact, isLoading: heroIsLoading } = useQuery(
    "contactInfo",
    async () => {
      return client.fetch(groq`*[_type == "contactInfo" ]`);
    }
  );

  const info = heroContact?.[0];

  return (
    <Box>
      <VStack align="left">
        <Reveal>
          <Heading
            as="h6"
            fontSize="sm"
            color="secondary.700"
            fontWeight="bold"
          >
            GET IN TOUCH
          </Heading>
        </Reveal>
        <Reveal>
          <Heading as="h6" fontSize="xl">
            {info?.title}
          </Heading>
        </Reveal>
      </VStack>
      <VStack spacing={4} mt={6}>
        {contactInfo(info)?.map((info) => (
          <Reveal key={info?.name} width="100%">
            <HStack
              spacing={4}
              border="1px solid #CBD5E0"
              rounded="md"
              p={4}
              width="full"
            >
              <Icon as={info?.icon} boxSize={6} />
              <Box>
                <Heading as="h5" fontSize="xl">
                  {info?.name}
                </Heading>
                {info?.isLink ? (
                  <a href={`mailto: ${info?.value}`}>{info?.value}</a>
                ) : (
                  <Text>{info?.value} </Text>
                )}
              </Box>
            </HStack>
          </Reveal>
        ))}
      </VStack>
    </Box>
  );
};

export default ContactInfo;
