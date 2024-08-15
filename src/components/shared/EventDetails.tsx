import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Flex,
  Text,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { urlFor } from "../../../sanity/sanity-client";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import CustomButton from "./CustomButton";
import ReactPlayer from "react-player";
import moment from "moment";

const EventDetails = ({
  isOpen,
  closeModal,
  event,
}: {
  isOpen: boolean;
  closeModal: () => void;
  event: any;
}) => {
  const [isMobileOrTablet] = useMediaQuery("(max-width: 1250px)");

  const { description, start_date, location, video } = event;
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
      }}
      size={isMobileOrTablet ? "full" : "5xl"}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex="9999" bg="primary" color="white" />
        <ModalBody>
          {video ? (
            <ReactPlayer
              url={video}
              width="100%"
              height={500}
              controls={true}
            />
          ) : (
            <Box height={{base: "20rem", lg: "30rem"}} >
              <Image
                src={
                  event?.image &&
                  (urlFor(event?.image?.asset?._ref) as unknown as string)
                }
                alt={event?.image?.alt}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
          )}
          <Flex flexDirection={{base: "column", lg: "row"}} justify="space-between" align="center" mt={6}>
            <Box>
              <Flex mt={4} align="center" color="gray.500">
                <FaRegCalendarAlt />
                <Text ml={2}>   {`${moment(event?.start_date)
                .tz("America/Toronto")
                .format("llll")} - ${moment(event?.end_date)
                .tz("America/Toronto")
                .format("llll")} (Eastern Standard Time (ET))`}</Text>
              </Flex>
              <Flex align="center" color="gray.500" mt={2}>
                <FaMapMarkerAlt />
                <Text ml={2}>{location}</Text>
              </Flex>
            </Box>
            {(!isMobileOrTablet && event?.ticket_url) && (
              <Link isExternal href={event?.ticket_url}>
                <CustomButton title="Purchase Ticket" width="12rem" />
              </Link>
            )}
          </Flex>
          <Text mt={4} mb={6}>
            {description}
          </Text>
          {(isMobileOrTablet && event?.ticket_url) && (
              <Link as={Flex} justify="center" isExternal href={event?.ticket_url}>
                <CustomButton title="Purchase Ticket" width="12rem" />
              </Link>
            )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventDetails;
