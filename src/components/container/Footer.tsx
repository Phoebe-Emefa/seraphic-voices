"use client";

import { useContactInfo } from "@/hooks/useCms";
import { menus, socials } from "@/utils/misc";
import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";

const linkStyles = {
  fontSize: "sm",
  color: "whiteAlpha.800",
  fontWeight: 400,
  letterSpacing: "0.02em",
  lineHeight: 1.5,
  transition: "color 180ms ease",
  _hover: { color: "secondary.500" },
};

const contactStyles = {
  fontSize: "sm",
  color: "whiteAlpha.700",
  lineHeight: 1.5,
};

const Footer = () => {
  const { data } = useContactInfo();
  const info = data?.[0];

  const hasContact = info?.address || info?.phoneNumber || info?.email;

  return (
    <Box
      as="footer"
      w="full"
      bg="#031433"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      color="white"
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
        py={{ base: 6, md: 8 }}
      >
        <Stack spacing={{ base: 5, md: 6 }}>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr auto 1fr" }}
            columnGap={{ md: 10, lg: 12, xl: 16 }}
            rowGap={{ base: 5, md: 6, lg: 0 }}
            alignItems="start"
          >
            <Stack
              spacing={3}
              align={{ base: "center", md: "flex-start" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Link href="/" aria-label="Seraphic Voices of Toronto home">
                <Box h={{ base: "3.25rem", md: "3.75rem" }} w={{ base: "10.5rem", md: "11.5rem" }}>
                  <Image
                    src="/images/seraphic-voices.png"
                    alt="Seraphic Voices of Toronto"
                    h="100%"
                    w="100%"
                    objectFit="contain"
                    objectPosition={{ base: "center", md: "left center" }}
                    filter="brightness(0) invert(1)"
                    opacity={0.95}
                  />
                </Box>
              </Link>
              <Text
                fontSize="sm"
                color="whiteAlpha.700"
                lineHeight={1.55}
                fontStyle="italic"
                maxW="28ch"
              >
                Harmonizing cultures through the gift of choral music.
              </Text>
            </Stack>

            <Box w="full">
              <SimpleGrid
                columns={2}
                spacingX={4}
                spacingY={3}
                display={{ base: "grid", md: "none" }}
                w="full"
                maxW="20rem"
                mx="auto"
              >
                {menus.map((menu) => (
                  <Link key={menu.path} href={menu.path}>
                    <Text {...linkStyles} textAlign="center">
                      {menu.label}
                    </Text>
                  </Link>
                ))}
              </SimpleGrid>

              <Stack
                spacing={2.5}
                align="flex-start"
                display={{ base: "none", md: "flex", lg: "flex" }}
                pt={{ lg: "0.125rem" }}
              >
                {menus.map((menu) => (
                  <Link key={menu.path} href={menu.path}>
                    <Text {...linkStyles}>{menu.label}</Text>
                  </Link>
                ))}
              </Stack>
            </Box>

            <Stack
              spacing={2}
              align={{ base: "center", md: "flex-start", lg: "flex-end" }}
              textAlign={{ base: "center", md: "left", lg: "right" }}
              justifySelf={{ lg: "end" }}
              w="full"
              gridColumn={{ md: "1 / -1", lg: "auto" }}
              pt={{ base: 1, md: 0 }}
              borderTop={{ base: "1px solid", md: "1px solid", lg: "none" }}
              borderColor="whiteAlpha.100"
            >
              {info?.address ? (
                <Text {...contactStyles}>{info.address}</Text>
              ) : null}
              {info?.phoneNumber ? (
                <Text {...contactStyles}>
                  {info.phoneNumber.split("/").map((part: string, i: number, arr: string[]) => (
                    <React.Fragment key={i}>
                      <a href={`tel:${part.trim()}`} style={{ color: "inherit" }}>
                        {part.trim()}
                      </a>
                      {i < arr.length - 1 ? " · " : null}
                    </React.Fragment>
                  ))}
                </Text>
              ) : null}
              {info?.email ? (
                <Text {...contactStyles}>
                  <a href={`mailto:${info.email}`} style={{ color: "inherit" }}>
                    {info.email}
                  </a>
                </Text>
              ) : null}
              {!hasContact ? (
                <Link href="/contact-us">
                  <Text {...linkStyles}>Contact us</Text>
                </Link>
              ) : null}
            </Stack>
          </Grid>

          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "center" }}
            justify="space-between"
            gap={{ base: 4, md: 4 }}
            pt={{ base: 4, md: 5 }}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontSize="xs" color="whiteAlpha.500" letterSpacing="0.03em">
              &copy; {new Date().getFullYear()} Seraphic Voices of Toronto
            </Text>

            <HStack spacing={{ base: 5, md: 6 }} flexWrap="wrap" justify="center">
              <Link href="/donate">
                <HStack
                  spacing={1.5}
                  color="secondary.500"
                  fontSize="xs"
                  fontWeight="semibold"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  transition="color 180ms ease"
                  _hover={{ color: "white" }}
                >
                  <Text>Support the ensemble</Text>
                  <Box as={BsArrowUpRight} boxSize={3.5} />
                </HStack>
              </Link>

              <HStack spacing={5}>
                {socials.map((social) => (
                  <Box
                    key={social.link}
                    as="a"
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.link}
                    color="whiteAlpha.600"
                    transition="color 180ms ease"
                    _hover={{ color: "white" }}
                  >
                    {React.createElement(social.icon, {
                      style: { height: "17px", width: "17px" },
                    })}
                  </Box>
                ))}
              </HStack>
            </HStack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
