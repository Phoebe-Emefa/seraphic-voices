"use client";
import Hero from "@/components/about/Hero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { SEO } from "@/components/shared/SEO";
import { Container, Flex } from "@chakra-ui/react";
import React from "react";

const ContactUs = () => {
  return (
    <>
     <SEO
        title="Contact Us"
        description="Reach out to our team for inquiries and assistance. We're here to help."
        path="/contact-us"
      />
      <Hero heading="Contact Us" description="We would love to hear from you" image="images/hero-9.jpg" />
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
