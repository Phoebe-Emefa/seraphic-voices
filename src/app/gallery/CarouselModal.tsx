import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { urlFor } from "../../../sanity/sanity-client";

const CarouselModal = ({
  isOpen,
  closeModal,
  selectedImageIndex,
  images,
}: {
  isOpen: boolean;
  closeModal: () => void;
  selectedImageIndex: number | null;
  images: any[];
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
      }}
      size="4xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex="9999" bg="primary" color="white" />
        <ModalBody>
          {selectedImageIndex !== null && (
            <Carousel
              selectedItem={selectedImageIndex}
              infiniteLoop
              showArrows
              showThumbs={false}
              showStatus={false}
              dynamicHeight
            >
              {images?.map((item, index) => (
                <div key={index}>
                  <Image
                    src={urlFor(item?.image?.asset?._ref) as unknown as string}
                    alt={`Choir Gallery Image ${index + 1}`}
                    width="100%"
                    height="100%"
                    maxHeight="80vh"
                    objectFit="contain"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CarouselModal;
