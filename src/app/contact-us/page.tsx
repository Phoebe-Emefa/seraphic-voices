"use client";
import Hero from "@/components/about/Hero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { Container, Flex } from "@chakra-ui/react";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <Hero heading="Contact Us" description="We would love to hear from you" />
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "5xl",  }}
        py={16}
      >
        <Flex direction={{base: "column", md: "row"}} justify="space-between" gap={{base: 16, md: 2}} align="center">
          <ContactInfo />
          <ContactForm />
        </Flex>
      </Container>
    </>
  );
};

export default ContactUs;
