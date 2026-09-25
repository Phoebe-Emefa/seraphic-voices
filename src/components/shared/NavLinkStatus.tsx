"use client";

import { Box, Text, type TextProps } from "@chakra-ui/react";
import { useLinkStatus } from "next/link";

type NavPendingBarProps = {
  variant?: "underline" | "border-left";
  color?: string;
};

export function NavPendingBar({
  variant = "underline",
  color = "secondary.500",
}: NavPendingBarProps) {
  const { pending } = useLinkStatus();

  if (variant === "border-left") {
    return (
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        w="3px"
        bg={color}
        borderRadius="sm"
        opacity={pending ? 0.9 : 0}
        pointerEvents="none"
        transition="opacity 120ms ease-out"
        aria-hidden
      />
    );
  }

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      h="3px"
      bg={color}
      opacity={pending ? 0.75 : 0}
      pointerEvents="none"
      transformOrigin="left"
      transition="opacity 120ms ease-out"
      aria-hidden
      sx={{
        ...(pending
          ? {
              "@media (prefers-reduced-motion: no-preference)": {
                animation: "navPendingPulse 1.2s ease-in-out infinite",
              },
            }
          : {}),
        "@keyframes navPendingPulse": {
          "0%, 100%": { opacity: 0.45, transform: "scaleX(0.65)" },
          "50%": { opacity: 0.85, transform: "scaleX(1)" },
        },
      }}
    />
  );
}

type NavPendingTextProps = TextProps & {
  isActive?: boolean;
};

export function NavPendingText({ isActive, ...props }: NavPendingTextProps) {
  const { pending } = useLinkStatus();

  return (
    <Text
      {...props}
      opacity={pending && !isActive ? 0.72 : 1}
      transition="opacity 120ms ease-out"
    />
  );
}
