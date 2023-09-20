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
import { urlFor } from "../../../sanity/sanity-client";

const About = ({content}: {content: any}) => {
  const router = useRouter();
  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} mt={{base: 48, md: 20}} mb={{base: 16, md: 20}}>
      <Flex direction={{base: "column-reverse", md: "row"}} justify="space-between" align="center">
        <Box height={{ md: "14rem", xl: "25rem" }} width={{ base: "100%", md: "50%" }} display={{base: "none", md: "block"}}>
          <Image
            src={content?.about_image && urlFor(content?.about_image?.asset?._ref)  as unknown as string}
            alt={content?.about_image?.alt }
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
           {content?.about_description}
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
