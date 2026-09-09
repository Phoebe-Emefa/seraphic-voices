"use client";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavPendingBar, NavPendingText } from "@/components/shared/NavLinkStatus";
import { IoCloseOutline } from "react-icons/io5";
import CustomButton from "@/components/shared/CustomButton";
import { menus } from "@/utils/misc";

const MenuDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="full" placement="right">
      <DrawerOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
      <DrawerContent
        bg="#041a42"
        color="white"
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="hidden"
      >
        {/* Subtle decorative background glow */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          w="24rem"
          h="24rem"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(90, 122, 173, 0.25) 0%, transparent 70%)"
          pointerEvents="none"
        />

        {/* Header */}
        <DrawerHeader px={{ base: 5, sm: 8 }} py={4} borderBottom="1px solid" borderColor="whiteAlpha.150">
          <Flex justify="space-between" align="center">
            <Box h={16} w={52}>
              <Image
                src="/images/seraphic-voices.png"
                alt="Seraphic Voices of Toronto"
                h="100%"
                w="100%"
                objectFit="contain"
                objectPosition="left center"
                filter="brightness(0) invert(1)"
              />
            </Box>
            <IconButton
              aria-label="Close menu"
              icon={<IoCloseOutline />}
              variant="ghost"
              fontSize="2xl"
              color="white"
              borderRadius="full"
              _hover={{ bg: "whiteAlpha.200" }}
              _active={{ transform: "scale(0.95)" }}
              onClick={onClose}
            />
          </Flex>
        </DrawerHeader>

        {/* Navigation Body */}
        <DrawerBody
          px={{ base: 5, sm: 8 }}
          py={6}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <VStack align="flex-start" spacing={2} w="full">
            <Text
              fontSize="2xs"
              fontWeight="bold"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="whiteAlpha.500"
              mb={1}
              px={3}
            >
              Navigation
            </Text>

            {menus.map((menu, idx) => {
              const isActive = pathname === menu.path;
              return (
                <Link
                  key={menu.path || idx}
                  href={menu.path || "/"}
                  onClick={onClose}
                  style={{ width: "100%", position: "relative", display: "block" }}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    py={2.5}
                    px={3}
                    borderRadius="md"
                    bg={isActive ? "whiteAlpha.150" : "transparent"}
                    borderLeft={isActive ? "3px solid white" : "3px solid transparent"}
                    transition="background-color 180ms ease, padding-left 180ms ease, border-color 180ms ease"
                    _hover={{ bg: "whiteAlpha.100", pl: 4 }}
                  >
                    <NavPendingText
                      isActive={isActive}
                      fontSize={{ base: "md", sm: "lg" }}
                      fontWeight={isActive ? "bold" : "500"}
                      color={isActive ? "white" : "whiteAlpha.800"}
                      letterSpacing="-0.01em"
                    >
                      {menu.label}
                    </NavPendingText>
                    {isActive ? (
                      <Box w={1.5} h={1.5} borderRadius="full" bg="secondary.500" flexShrink={0} />
                    ) : null}
                  </Flex>
                  <NavPendingBar variant="border-left" color="secondary.500" />
                </Link>
              );
            })}
          </VStack>

          {/* Footer with CTA and brand note */}
          <Box pt={6} pb={{ base: 4, sm: 2 }} borderTop="1px solid" borderColor="whiteAlpha.150" w="full">
            <CustomButton
              title="Support & Donate"
              href="/donate"
              onClick={onClose}
              width="100%"
              height="3.25rem"
              fontSize={{ base: "sm", sm: "md" }}
              bg="secondary.500"
              hoverBg="white"
              textColor="secondary.700"
            />

            <HStack justify="center" spacing={2} mt={4} color="whiteAlpha.500" fontSize="2xs">
              <Text>Seraphic Voices of Toronto</Text>
              <Text aria-hidden>·</Text>
              <Text>Harmonizing Cultures</Text>
            </HStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
