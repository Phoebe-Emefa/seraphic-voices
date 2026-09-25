"use client";

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];

type DonateInstructionsProps = {
  title: string;
  instructions: string[];
};

function InstructionStep({ text, index }: { text: string; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: easeOut }}
    >
      <Flex
        align="flex-start"
        gap={4}
        p={{ base: 4, md: 5 }}
        borderRadius="xl"
        bg="secondary.100"
        border="1px solid"
        borderColor="blackAlpha.50"
        w="full"
        minW={0}
      >
        <Flex
          align="center"
          justify="center"
          w={9}
          h={9}
          borderRadius="full"
          bg="secondary.700"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          flexShrink={0}
        >
          {index + 1}
        </Flex>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="secondary.700"
          lineHeight={1.75}
          pt={0.5}
          sx={{ textWrap: "pretty" }}
        >
          {text}
        </Text>
      </Flex>
    </motion.div>
  );
}

const DonateInstructions = ({ title, instructions }: DonateInstructionsProps) => {
  if (!title && instructions.length === 0) {
    return null;
  }

  return (
    <Box
      w="full"
      minW={0}
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      bg="white"
      border="1px solid"
      borderColor="blackAlpha.50"
      boxShadow="0 24px 48px -28px rgba(4, 35, 92, 0.25)"
    >
      {title ? (
        <>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="secondary.700"
            letterSpacing="-0.02em"
            mb={2}
          >
            {title}
          </Heading>
          <Box w="2.5rem" h="2px" bg="secondary.500" mb={8} />
        </>
      ) : null}

      {instructions.length > 0 ? (
        <VStack spacing={4} align="stretch" w="full">
          {instructions.map((instruction, index) => (
            <InstructionStep
              key={`${index}-${instruction.slice(0, 24)}`}
              text={instruction}
              index={index}
            />
          ))}
        </VStack>
      ) : null}
    </Box>
  );
};

export default DonateInstructions;
