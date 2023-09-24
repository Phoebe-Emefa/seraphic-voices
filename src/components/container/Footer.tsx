import { Box, Container, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/images/seraphic-voices.png";
import { socials } from "@/utils/misc";

const Footer = () => {
  return (
    <Box w="full" as="footer" bg="secondary.100">
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
        py={6}
      >
        <VStack align="center" justify="center">
          <Link href="/" rel="noreferrer">
            <Image
              src={logo}
              alt="The Talent Empowerment Foundation Logo"
              height={96}
            />
          </Link>
          <HStack color="primary">
            {socials?.map((social, index) => (
              <a
                target="_blank"
                href={social.link}
                key={index}
                rel="noopener noreferrer"
              >
                {React.createElement(social.icon, {
                  className: "icon-class",
                  style: { height: "24px", width: "24px" },
                })}
              </a>
            ))}
          </HStack>
          <Text fontSize={{ base: "xs", lg: "md" }} mt={2}>
            &copy; {new Date().getFullYear()} Seraphic Voices of Toronto. All
            rights reserved
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
