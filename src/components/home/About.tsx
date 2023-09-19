import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const About = () => {
  const router = useRouter();
  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} mt={{base: 36, md: 20}} mb={{base: 16, md: 20}}>
      <Flex direction={{base: "column-reverse", md: "row"}} justify="space-between" align="center">
        <Box height={{ md: "14rem", xl: "25rem" }} width={{ base: "100%", md: "50%" }} display={{base: "none", md: "block"}}>
          <Image
            src="/images/group.jpg"
            alt="The seraphic voices"
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="bottom"
            rounded="md"
          />
        </Box>
        <Box width={{ base: "100%", md: "45%" }}>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", xl: "3xl" }}
            color="secondary.700"
            mt={{ base: 20, md: "inherit" }}
          >
            About Us
          </Heading>
          <Text
            fontSize={{ md: "md", xl: "lg" }}
            my={{ base: 4, md: 6 }}
            color={"black"}
          >
            Welcome to Seraphic Voices of Toronto, where the rich tapestry of
            Western and African choral music intertwines to create harmonious
            connections. Founded by Samuel Wesley Asare-Kusi in 2019, our
            26-member ensemble celebrates cultural diversity and fosters
            cross-cultural understanding within Toronto and beyond
          </Text>
          <Button
            color="secondary.700"
            variant="link"
            rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
            onClick={() => router?.push("/about-us")}
          >
            Learn More
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default About;
