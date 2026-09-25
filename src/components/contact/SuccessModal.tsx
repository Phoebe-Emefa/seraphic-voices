"use client";

import CustomButton from "@/components/shared/CustomButton";
import {
  Box,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiXMark } from "react-icons/hi2";

const SuccessModal = ({
  onClose,
  isOpen,
  title,
  message,
  closeLabel,
}: {
  onClose: () => void;
  isOpen: boolean;
  title: string;
  message: string;
  closeLabel: string;
}) => {
  if (!title && !message && !closeLabel) {
    return null;
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="md" motionPreset="none">
      <ModalOverlay bg="rgba(4, 18, 48, 0.88)" backdropFilter="blur(8px)" />
      <ModalContent
        mx={4}
        borderRadius="2xl"
        overflow="hidden"
        bg="white"
        boxShadow="0 32px 64px -24px rgba(4, 35, 92, 0.4)"
      >
        <ModalBody p={{ base: 6, md: 8 }}>
          <IconButton
            aria-label="Close"
            icon={<HiXMark />}
            onClick={onClose}
            position="absolute"
            top={4}
            right={4}
            size="sm"
            variant="ghost"
            color="secondary.700"
            borderRadius="full"
          />

          <VStack spacing={5} align="center" pt={2}>
            <Box w="2.5rem" h="2px" bg="secondary.500" />
            {title ? (
              <Text
                fontWeight="bold"
                fontSize={{ base: "xl", md: "2xl" }}
                color="secondary.700"
                textAlign="center"
                letterSpacing="-0.02em"
                sx={{ textWrap: "balance" }}
              >
                {title}
              </Text>
            ) : null}
            {message ? (
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="secondary.700"
                opacity={0.8}
                textAlign="center"
                lineHeight={1.7}
                maxW="28rem"
              >
                {message}
              </Text>
            ) : null}
            <Image src="/images/success.svg" alt="" w="20" opacity={0.9} />
            {closeLabel ? (
              <CustomButton title={closeLabel} onClick={onClose} width="auto" />
            ) : null}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
