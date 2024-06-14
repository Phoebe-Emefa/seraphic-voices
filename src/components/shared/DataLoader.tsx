import { Center, Image, VStack, keyframes } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
 // Define the keyframe animations
 const rotate = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const scale = keyframes`
 0%, 100% { transform: scale(1); }
 50% { transform: scale(1.2); }
`;

const combinedAnimation = `${rotate} 4s linear infinite, ${scale} 2s ease-in-out infinite`;
  return (
    <Center height="100vh" width="100vw">
      <VStack>
        <Image
          src="/images/seraphic-voices.png"
          alt="Seraphic Voices of Toronto Logo"
          height={40}
          animation={combinedAnimation}
        />
      </VStack>
    </Center>
  );
};

export default Loading;
