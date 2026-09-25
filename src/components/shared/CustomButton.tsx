import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type CustomButtonProps = {
  title: string;
  href?: string;
  onClick?: () => void;
  width?: string | number | object;
  height?: number | string | object;
  fontSize?: string | number | object;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  isDisabled?: boolean;
  /** Opens href in a new tab. Auto-detected for http(s) links when omitted. */
  external?: boolean;
  bg?: string;
  hoverBg?: string;
  textColor?: string;
  variant?: "solid" | "outline";
  borderColor?: string;
};

const CustomButton = ({
  title,
  href,
  onClick,
  width,
  height,
  fontSize,
  type = "button",
  isLoading,
  isDisabled,
  external,
  bg = "secondary.700",
  hoverBg = "primary",
  textColor = "white",
  variant = "solid",
  borderColor,
}: CustomButtonProps) => {
  const isOutline = variant === "outline";
  const resolvedBorderColor = borderColor || textColor;
  const resolvedHeight = height || { base: "3rem", md: "3.25rem" };
  const resolvedWidth = width || { base: "auto", md: "9rem" };
  const resolvedFontSize = fontSize || { base: "sm", xl: "lg" };
  const isFullWidth =
    resolvedWidth === "100%" ||
    resolvedWidth === "full" ||
    (typeof resolvedWidth === "object" &&
      resolvedWidth !== null &&
      Object.values(resolvedWidth).some((value) => value === "100%" || value === "full"));

  const sharedProps = {
    bg: isOutline ? "transparent" : bg,
    color: textColor,
    border: isOutline ? "1px solid" : undefined,
    borderColor: isOutline ? resolvedBorderColor : undefined,
    fontWeight: 700,
    fontSize: resolvedFontSize,
    rounded: "full",
    h: resolvedHeight,
    minH: resolvedHeight,
    w: resolvedWidth,
    maxW: isFullWidth ? "none" : undefined,
    px: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1.2",
    flexShrink: isFullWidth ? 1 : 0,
    alignSelf: isFullWidth ? "stretch" : undefined,
    colorScheme: "none",
    isLoading,
    isDisabled,
    whiteSpace: "nowrap",
    transition:
      "transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 160ms cubic-bezier(0.23, 1, 0.32, 1)",
    _hover: {
      bg: hoverBg,
      textDecoration: "none",
      borderColor: isOutline ? resolvedBorderColor : undefined,
    },
    _active: { transform: "scale(0.97)" },
  };

  if (href) {
    const isExternal = external ?? /^https?:\/\//i.test(href);

    if (isExternal) {
      return (
        <Button
          as="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          {...sharedProps}
        >
          {title}
        </Button>
      );
    }

    return (
      <Button as={Link} href={href} onClick={onClick} {...sharedProps}>
        {title}
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      type={type}
      {...sharedProps}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
