"use client";

import {
  Box,
  Container,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import logo from "../../../public/images/seraphic-voices.png";
import CustomButton from "@/components/shared/CustomButton";
import MenuDrawer from "@/components/container/MenuDrawer";
import SingleMenu from "@/components/container/SingleMenu";
import { useHeroNav } from "@/components/home/Hero/HeroNavContext";
import { menus } from "@/utils/misc";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

const NavBar = () => {
  const [isMobileOrTablet] = useMediaQuery("(max-width: 1250px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();
  const heroNav = useHeroNav();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const hasPageHero = heroNav?.pageHeroActive ?? false;
  const useGlass = !scrolled && (isHome || hasPageHero);
  const isImmersive = useGlass && (heroNav?.theme ?? "immersive") === "immersive";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = useGlass
    ? "transparent"
    : "secondary.100";

  const linkColor = useGlass
    ? isImmersive
      ? "white"
      : "secondary.700"
    : undefined;

  const activeBorderColor = useGlass
    ? isImmersive
      ? "white"
      : "#244983"
    : undefined;

  const menuIconColor = useGlass && isImmersive ? "white" : "secondary.700";

  return (
    <Box
      h={20}
      top={0}
      as="nav"
      w="full"
      zIndex="nav"
      pos="fixed"
      bg={navBg}
      backdropFilter={scrolled ? "blur(12px)" : undefined}
      borderBottom={scrolled ? "1px solid" : "none"}
      borderColor={scrolled ? "blackAlpha.100" : "transparent"}
      transition="background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease"
    >
      <Container
        display="flex"
        h="full"
        alignItems="center"
        justifyContent="space-between"
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
      >
        <Link href="/" aria-label="Seraphic Voices of Toronto home">
          <Image
            src={logo}
            alt="Seraphic Voices of Toronto"
            height={96}
            style={{
              filter: useGlass && isImmersive ? "brightness(0) invert(1)" : "none",
              transition: "filter 300ms ease",
            }}
          />
        </Link>
        {isMobileOrTablet ? (
          <Flex align="center" gap={4}>
            <IconButton
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              icon={<CgMenuRight />}
              variant="ghost"
              fontSize="2xl"
              color={menuIconColor}
              onClick={onOpen}
            />
          </Flex>
        ) : (
          <Flex align="center" justify="space-between" width="58%" gap={2}>
            {menus.map((menu) => (
              <SingleMenu
                key={menu.path}
                menu={menu}
                color={linkColor}
                activeBorderColor={activeBorderColor}
              />
            ))}
          </Flex>
        )}
        {!isMobileOrTablet &&
          (useGlass && isImmersive ? (
            <Link href="/donate">
              <Box
                as="span"
                display="inline-block"
                px={6}
                py={2}
                borderRadius="full"
                border="2px solid white"
                color="white"
                fontWeight={700}
                fontSize="lg"
                transition="background-color 160ms ease, color 160ms ease"
                _hover={{ bg: "white", color: "primary" }}
              >
                Donate
              </Box>
            </Link>
          ) : (
            <CustomButton title="Donate" href="/donate" />
          ))}
      </Container>
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default NavBar;
