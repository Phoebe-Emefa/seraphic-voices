import CustomButton from '@/components/shared/CustomButton'
import Reveal from '@/components/shared/Reveal'
import { Box, Container, Heading,  VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
  <Box backgroundColor="bg.200" py={20}>
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} >
          <VStack>
     <Reveal>
          <Heading
          as="h4"
          fontSize={{ base: "2xl", xl: "3xl" }}
          color="secondary.700"
          textAlign="center"
        >
       Have any enquiries or interested joining us?
        </Heading>
     </Reveal>
         <Link href="/contact-us">
        <Reveal>
           <CustomButton title="Contact Us"  />
        </Reveal>
         </Link>
    </VStack>
    </Container>
  </Box>
  )
}

export default Contact
