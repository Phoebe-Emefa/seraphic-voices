import CustomButton from '@/components/shared/CustomButton'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
  <Box backgroundColor="bg.200" py={20}>
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} >
          <VStack>
         <Heading
          as="h4"
          fontSize={{ base: "2xl", xl: "3xl" }}
          color="secondary.700"
          textAlign="center"
        >
       Have any enquiries or interested joining us?
        </Heading>
        <Text></Text>
         <Link href="/contact-us">
         <CustomButton title="Contact Us"  />
         </Link>
    </VStack>
    </Container>
  </Box>
  )
}

export default Contact
