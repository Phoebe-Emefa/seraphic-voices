import { Text, Fade, Flex } from "@chakra-ui/react";
import React from "react";

function FormErrorHandler({ error }: { error?: string }) {
  return (
    <Fade in={!!error}>
      <Flex rounded="md" align="center" color="red.600" w="full" py={1}>
        <Text fontSize="xs">{error}</Text>
      </Flex>
    </Fade>
  );
}

export default FormErrorHandler;
