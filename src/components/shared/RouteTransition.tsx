"use client";

import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type RouteTransitionProps = {
  onNavigatingChange?: (navigating: boolean) => void;
};

function isInternalNavigation(href: string | null, pathname: string) {
  if (!href || href.startsWith("#")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === pathname && !url.search) return false;
    return true;
  } catch {
    return false;
  }
}

export default function RouteTransition({ onNavigatingChange }: RouteTransitionProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!isInternalNavigation(href, pathname)) return;

      setIsNavigating(true);
      onNavigatingChange?.(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [onNavigatingChange, pathname]);

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      setIsNavigating(false);
      onNavigatingChange?.(false);
    }
  }, [onNavigatingChange, pathname]);

  if (!isNavigating) return null;

  return (
    <Box
      position="fixed"
      top={20}
      left={0}
      right={0}
      h="2px"
      bg="secondary.500"
      zIndex={65}
      pointerEvents="none"
      aria-hidden
      sx={{
        "@media (prefers-reduced-motion: no-preference)": {
          animation: "routeTransitionPulse 1s ease-in-out infinite",
        },
        "@keyframes routeTransitionPulse": {
          "0%, 100%": { opacity: 0.35, transform: "scaleX(0.7)" },
          "50%": { opacity: 0.95, transform: "scaleX(1)" },
        },
      }}
    />
  );
}
