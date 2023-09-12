import { Text, Fade, Flex } from '@chakra-ui/react';
import React from 'react';

export interface IFormErrorHandler {
  error: string;
}

function FormErrorHandler({ error }: IFormErrorHandler) {
  return (
    <Fade in={!!error}>
      <Flex
        rounded="md"
        justify="space-between"
        align="center"
        color="red"
        w="full"
        py={1}
      >
        <Text
          fontSize="xs"
          dangerouslySetInnerHTML={{
            __html: error as string
          }}
        />
      </Flex>
    </Fade>
  );
}

export default FormErrorHandler;
