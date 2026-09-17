"use client";

import type { PortableBlock, PortableChild } from "@/lib/portableText";
import { plainPortableText } from "@/lib/portableText";
import { Text } from "@chakra-ui/react";
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

type VisionPortableTextProps = {
  value?: PortableBlock[] | null;
  variant: "body" | "approach";
  startDelay?: number;
};

function VisionBlock({
  block,
  index,
  variant,
  startDelay = 0,
}: {
  block: PortableBlock;
  index: number;
  variant: "body" | "approach";
  startDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const body = markedChildren(block.children);
  const text = plainPortableText(block.children);
  if (!text.trim()) return null;

  const delay = startDelay + index * 0.03;
  const isApproach = variant === "approach" || block.style === "approach";

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.4, delay, ease: easeOut },
    style: { width: "100%", minWidth: 0, maxWidth: "100%" } as const,
  };

  if (isApproach) {
    return (
      <motion.div {...motionProps}>
        <Text
          as="p"
          fontSize={{ base: "md", sm: "md", md: "xl" }}
          color="secondary.700"
          lineHeight={1.7}
          fontStyle="italic"
          fontWeight="medium"
          sx={{ textWrap: "pretty" }}
        >
          {body}
        </Text>
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps}>
      <Text
        as="p"
        fontSize={{ base: "md", sm: "md" }}
        color="secondary.700"
        opacity={0.9}
        lineHeight={{ base: 1.7, md: 1.75 }}
        sx={{ textWrap: "pretty" }}
      >
        {body}
      </Text>
    </motion.div>
  );
}

export function VisionPortableText({ value, variant, startDelay = 0 }: VisionPortableTextProps) {
  if (!value?.length) return null;

  return (
    <>
      {value.map((block, index) => {
        if (block._type !== "block") return null;
        return (
          <VisionBlock
            key={block._key ?? index}
            block={block}
            index={index}
            variant={variant}
            startDelay={startDelay}
          />
        );
      })}
    </>
  );
}
