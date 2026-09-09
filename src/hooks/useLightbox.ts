"use client";

import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export function useLightbox() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openAt = (index: number) => {
    setSelectedIndex(index);
    onOpen();
  };

  const close = () => {
    setSelectedIndex(null);
    onClose();
  };

  return { isOpen, selectedIndex, openAt, close };
}
