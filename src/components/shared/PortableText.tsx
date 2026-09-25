"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

type PortableChild = {
  text?: string;
  marks?: string[];
};

type PortableBlock = {
  _type?: string;
  style?: string;
  children?: PortableChild[];
};

function plainChildren(children?: PortableChild[]) {
  return children?.map((child) => child.text || "").join("") || "";
}

function markedChildren(children?: PortableChild[]) {
  return children?.map((child, index) => {
    let node: React.ReactNode = child.text || "";
    child.marks?.forEach((mark) => {
      if (mark === "strong") node = <strong key={`${index}-s`}>{node}</strong>;
      if (mark === "em") node = <em key={`${index}-e`}>{node}</em>;
      if (mark === "underline") node = <u key={`${index}-u`}>{node}</u>;
    });
    return <React.Fragment key={index}>{node}</React.Fragment>;
  });
}

export function PortableText({
  value,
  color,
}: {
  value?: PortableBlock[] | string;
  color?: string;
}) {
  if (!value) return null;
  if (typeof value === "string") {
    return (
      <Text color={color} mb={2}>
        {value}
      </Text>
    );
  }
  if (!Array.isArray(value)) return null;

  return (
    <>
      {value.map((block, index) => {
        if (block._type !== "block") return null;
        const body = markedChildren(block.children);
        switch (block.style) {
          case "h1":
            return (
              <Heading key={index} as="h2" fontSize="2xl" mb={4} color={color}>
                {plainChildren(block.children)}
              </Heading>
            );
          case "h2":
            return (
              <Heading key={index} as="h3" fontSize="xl" mb={3} color={color}>
                {plainChildren(block.children)}
              </Heading>
            );
          case "h3":
            return (
              <Heading key={index} as="h4" fontSize="lg" mb={2} color={color}>
                {plainChildren(block.children)}
              </Heading>
            );
          case "blockquote":
            return (
              <Box
                key={index}
                as="blockquote"
                borderLeft="1px solid"
                borderLeftColor="secondary.700"
                pl={4}
                my={4}
                fontStyle="italic"
                color={color}
              >
                {plainChildren(block.children)}
              </Box>
            );
          default:
            return (
              <Text key={index} mb={2} color={color}>
                {body}
              </Text>
            );
        }
      })}
    </>
  );
}
