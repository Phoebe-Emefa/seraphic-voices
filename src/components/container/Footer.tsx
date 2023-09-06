import { Box, Container, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../../public/images/seraphic-voices.png';

const Footer = () => {
  const [isMobileOrTablet] = useMediaQuery('(max-width: 1250px)');

  return (
    <Box w="full" as="footer" bg="secondary.100">
      <Container
        maxW={{ md: '2xl', lg: '4xl', xl: '6xl', '3xl': '7xl' }}
        py={6}
      >
        <VStack align="center" justify="center">
          <Link href="/" rel="noreferrer">
            <Image
              src={logo}
              alt="The Talent Empowerment Foundation Logo"
            //   height={isMobileOrTablet ? 30 : 40}
              height={96}

            />
          </Link>
          <Text fontSize={{ base: 'xs', lg: 'md' }} mt={2}>
            &copy; {new Date().getFullYear()} Seraphic Voices of Toronto.
            All rights reserved
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
