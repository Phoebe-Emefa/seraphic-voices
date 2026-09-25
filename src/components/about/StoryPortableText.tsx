"use client";

import type { PortableBlock, PortableChild } from "@/lib/portableText";
import { plainPortableText } from "@/lib/portableText";
import { Box, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

const easeOut = [0.23, 1, 0.32, 1];

function markedChildren(children?: PortableChild[]) {
  return children?.map((child, index) => {
    let node: React.ReactNode = child.text || "";
    child.marks?.forEach((mark) => {
      if (mark === "strong") node = <strong key={`${index}-s`}>{node}</strong>;
      if (mark === "em") node = <em key={`${index}-e`}>{node}</em>;
    });
    return <React.Fragment key={index}>{node}</React.Fragment>;
  });
}

type StoryPortableTextProps = {
  value?: PortableBlock[] | null;
  startDelay?: number;
};

function StoryBlock({
  block,
  index,
  startDelay = 0,
}: {
  block: PortableBlock;
  index: number;
  startDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const body = markedChildren(block.children);
  const text = plainPortableText(block.children);
  if (!text.trim()) return null;

  const delay = startDelay + index * 0.03;

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.4, delay, ease: easeOut },
    style: { width: "100%", minWidth: 0, maxWidth: "100%" } as const,
  };

  switch (block.style ?? "normal") {
    case "lead":
      return (
        <motion.div {...motionProps}>
          <Text
            as="p"
            fontSize={{ base: "md", sm: "lg", md: "2xl" }}
            color="secondary.700"
            fontWeight="medium"
            lineHeight={{ base: 1.55, md: 1.42 }}
            letterSpacing="-0.015em"
            sx={{ textWrap: "pretty" }}
          >
            {body}
          </Text>
        </motion.div>
      );
    case "intro":
      return (
        <motion.div {...motionProps}>
          <Text
            as="p"
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            color="secondary.700"
            fontWeight="medium"
            lineHeight={{ base: 1.55, md: 1.42 }}
            letterSpacing="-0.015em"
            sx={{ textWrap: "pretty" }}
          >
            {body}
          </Text>
        </motion.div>
      );
    default:
      return (
        <motion.div {...motionProps}>
          <Text
            as="p"
            fontSize={{ base: "md", sm: "md", lg: "md" }}
            color="secondary.700"
            opacity={0.9}
            fontWeight="normal"
            lineHeight={{ base: 1.75, md: 1.82 }}
            sx={{ textWrap: "pretty" }}
          >
            {body}
          </Text>
        </motion.div>
      );
  }
}

export function StoryPortableText({ value, startDelay = 0 }: StoryPortableTextProps) {
  if (!value?.length) return null;

  return (
    <>
      {value.map((block, index) => {
        if (block._type !== "block") return null;
        return (
          <StoryBlock key={block._key ?? index} block={block} index={index} startDelay={startDelay} />
        );
      })}
    </>
  );
}

export function StoryTaglines({
  value,
  startDelay = 0,
}: {
  value?: PortableBlock[] | null;
  startDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (!value?.length) return null;

  const lines = value
    .filter((block) => block._type === "block")
    .map((block) => plainPortableText(block.children).trim())
    .filter(Boolean);

  if (!lines.length) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: startDelay, ease: easeOut }}
      style={{ width: "100%", minWidth: 0, maxWidth: "100%" }}
    >
      <Box pt={{ base: 2, md: 4 }}>
        <Box w={{ base: "2.5rem", md: "3rem" }} h="2px" bg="secondary.500" mb={{ base: 3, md: 4 }} />
        {lines.map((line) => (
          <Text
            key={line}
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            color="secondary.700"
            fontWeight="semibold"
            lineHeight={1.45}
            fontStyle="italic"
            letterSpacing="-0.015em"
            mb={{ base: 3, md: 4 }}
            sx={{ textWrap: "balance" }}
          >
            {line}
          </Text>
        ))}
      </Box>
    </motion.div>
  );
}
