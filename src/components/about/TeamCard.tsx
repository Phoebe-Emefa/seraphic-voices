"use client";

import { resolveTeamMemberDisplay } from "@/lib/teamMember";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { imageSrc } from "../../../sanity/sanity-client";

const easeOut = [0.23, 1, 0.32, 1];

type TeamCardProps = {
  item: {
    _id?: string;
    name?: string;
    role?: string;
    image?: { asset?: { _ref?: string }; alt?: string };
  };
  index?: number;
};

const TeamCard = ({ item, index = 0 }: TeamCardProps) => {
  const reduceMotion = useReducedMotion();
  const { name, role } = resolveTeamMemberDisplay(item);
  const imageUrl = imageSrc(item?.image?.asset?._ref);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07, ease: easeOut }}
      style={{ width: "100%" }}
    >
      <Box
        role="group"
        position="relative"
        w="full"
        aspectRatio="3/4"
        borderRadius="2xl"
        overflow="hidden"
        bg="secondary.700"
        boxShadow="0 24px 48px -20px rgba(4, 35, 92, 0.35)"
        transition="transform 0.35s ease, box-shadow 0.35s ease"
        _hover={{
          transform: "translateY(-6px)",
          boxShadow: "0 32px 56px -16px rgba(4, 35, 92, 0.42)",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item?.image?.alt || name}
            position="absolute"
            inset={0}
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="top"
            transition="transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
            _groupHover={{ transform: "scale(1.05)" }}
          />
        ) : null}

        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(
            180deg,
            rgba(4, 25, 68, 0) 0%,
            rgba(4, 25, 68, 0.08) 45%,
            rgba(4, 25, 68, 0.72) 78%,
            rgba(4, 25, 68, 0.92) 100%
          )"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="3px"
          bg="linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.7), transparent)"
          opacity={0}
          transition="opacity 0.35s ease"
          _groupHover={{ opacity: 1 }}
          pointerEvents="none"
        />

        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          align="flex-start"
          spacing={1.5}
          p={{ base: 4, md: 5 }}
          zIndex={1}
        >
          {role ? (
            <Text
              fontSize="2xs"
              fontWeight="bold"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color="secondary.500"
              lineHeight={1.2}
            >
              {role}
            </Text>
          ) : null}
          <Text
            as="h3"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="semibold"
            color="white"
            lineHeight={1.25}
            letterSpacing="-0.01em"
            sx={{ textWrap: "balance" }}
          >
            {name}
          </Text>
          <Box
            w="2rem"
            h="2px"
            bg="secondary.500"
            borderRadius="full"
            transition="width 0.35s ease"
            _groupHover={{ w: "3rem" }}
          />
        </VStack>
      </Box>
    </motion.div>
  );
};

export default TeamCard;
