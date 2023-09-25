import {   Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
Image } from '@chakra-ui/react';
import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const CarouselModal = ({isOpen, closeModal, selectedImageIndex, images}: {isOpen: boolean; closeModal: () => void; selectedImageIndex: number | null; images: string[]}) => {
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
                  {images.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={image}
                        alt={`Choir Gallery Image ${index + 1}`}
                        width="100%"
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
  )
}

export default CarouselModal
