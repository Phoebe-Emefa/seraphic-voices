'use client';
import { Providers } from '@/app/providers';
import Footer from '@/components/container/Footer';
import NavBar from '@/components/container/Navbar';
import { Box } from '@chakra-ui/react';
import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <NavBar />
      <Box
        as="main"
        role="main"
        minH="100vh"
        pos="relative"
        aria-labelledby="main"
        mt={20}
      >
        {children}
      </Box>
      <Footer />
    </Providers>
  );
};

export default Container;
