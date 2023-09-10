import VideoModal from "@/components/shared/VideoModal";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsPlayCircleFill } from "react-icons/bs";

// Define the type for the video data
interface VideoData {
  title: string;
  image: string;
  url: string
}

const VideoCard: React.FC<VideoData> = ({ title, image, url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <VStack width="100%">
      <Flex
        align="center"
        justify="center"
        position="relative"
        bgColor="primary"
        borderRadius="md"
        overflow="hidden"
        cursor="pointer"
      >
        <Image src={image} alt={title} objectFit="cover" objectPosition="top" />
        <Flex
          justify="center"
          align="center"
          bgColor="rgba(255, 255, 255, 0.8)"
          rounded="full"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          onClick={()=> onOpen()}
        >
          <Icon as={BsPlayCircleFill} boxSize={12} color="primary" />
        </Flex>
      </Flex>
      <Box bgColor="white" p={4} borderRadius="md" width="full">
        <Heading as="h6" fontSize="md">
          {title}
        </Heading>
      </Box>
     <VideoModal isOpen={isOpen} onClose={onClose} title={title} url={url} />
    </VStack>
  );
};

export default VideoCard;
