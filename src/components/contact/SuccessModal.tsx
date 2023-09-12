import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const SuccessModal = ({
  onClose,
  isOpen
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm">
      <ModalOverlay />
      <ModalContent w="100%">
        <ModalCloseButton m="1">
          <IoCloseCircleOutline fontSize={'28px'} />
        </ModalCloseButton>
        <ModalBody m={4}>
          <VStack spacing={4}>
            <Text fontWeight={700} fontSize="xl" textAlign="center">
              Thank you for contacting us!
            </Text>
            <Text fontSize="xl" textAlign="center">
              We have received your message and will get back to you shortly.
            </Text>
            <Image src="/images/success.svg" alt="" w="40" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
