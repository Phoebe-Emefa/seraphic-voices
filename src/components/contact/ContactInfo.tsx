import { contactInfo } from "@/utils/misc";
import { Box, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ContactInfo = () => {
  return (
    <Box>
      <VStack align="left">
        <Heading as="h6" fontSize="sm" color="secondary.700" fontWeight="bold">
          GET IN TOUCH
        </Heading>
        <Heading
          as="h6"
          fontSize="xl"
        >
          Contact Details
        </Heading>
      </VStack>
      <VStack spacing={4} mt={6}>
        {contactInfo?.map((info) => (
          <HStack
            key={info?.name}
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
                <a href={`mailto: ${info?.value}`}>
                 {info?.value} 
                </a>
              ) : (
                <Text>{info?.value} </Text>
              )}
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ContactInfo;
