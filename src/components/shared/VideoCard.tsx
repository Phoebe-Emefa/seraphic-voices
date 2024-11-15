import Reveal from "@/components/shared/Reveal";
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
     <Reveal>
       <Flex
        align="center"
        justify="center"
        position="relative"
        bgColor="primary"
        borderRadius="md"
        overflow="hidden"
        cursor="pointer"
        height={60}
      >
        <Image src={image} alt={title} objectFit="cover" height="100%" width="100%" objectPosition="top" />
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
     </Reveal>
      <Box bgColor="white" p={4} borderRadius="md" width="full">
       <Reveal>
         <Heading as="h6" fontSize="md">
          {title}
        </Heading>
       </Reveal>
      </Box>
     <VideoModal isOpen={isOpen} onClose={onClose} title={title} url={url} />
    </VStack>
  );
};

export default VideoCard;
