import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";

const VideoModal = ({
  isOpen,
  onClose,
  title,
  url
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title} </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={8}>
          <ReactPlayer url={url} width="100%" height={500} controls={true} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
