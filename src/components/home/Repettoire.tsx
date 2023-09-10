import VideoCard from '@/components/shared/VideoCard'
import { Box, Button, Container, Grid, Heading, Icon, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

const Repettoire = () => {
  return (
   <Box backgroundColor="bg.100" py={20}>
     <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} >
      <VStack>
        <Heading
          as="h4"
          fontSize={{ base: "2xl", xl: "3xl" }}
          color="secondary.700"
          mt={{ base: 20, md: "inherit" }}
        >
        Repettoire
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)"  gap={6} mt={6} mb={4}>
            <VideoCard title="All Hail the Power" image="/images/choir-3.jpg"  url="https://www.youtube.com/embed/Ud7YvLSrpUk"  />
            <VideoCard title="See the Conquering Hero comes" image="/images/choir-3.jpg"  url="dddd"  />
            <VideoCard title="Seraphic Noël hilifes" image="/images/choir-3.jpg"  url="https://www.youtube.com/embed/HfawZypVNVw?si=yEqmjwLth4cN8h2-"  />
          
        </Grid>
           <Button color="secondary.700" variant="outline"  rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}>
            View All
          </Button>
      </VStack>
    </Container>
   </Box>
  )
}

export default Repettoire
