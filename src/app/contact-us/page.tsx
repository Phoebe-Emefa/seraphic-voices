"use client";
import Hero from "@/components/about/Hero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { SEO } from "@/components/shared/SEO";
import { Container, Flex } from "@chakra-ui/react";
import { groq } from "next-sanity";
import React from "react";
import { useQuery } from "react-query";
import { client, urlFor } from "../../../sanity/sanity-client";
import Reveal from "@/components/shared/Reveal";
import DataLoader from "@/components/shared/DataLoader";

const ContactUs = () => {
  const { data: heroContact, isLoading: heroIsLoading } = useQuery(
    "contactHero",
    async () => {
      return client.fetch(groq`*[_type == "contactHero" ]`);
    }
  );

  const heroContent = heroContact?.[0];

  return (
    <>
      <SEO
        title="Contact Us"
        description="Reach out to our team for inquiries and assistance. We're here to help."
        path="/contact-us"
      />
      {heroIsLoading ? (
        <DataLoader />
      ) : (
        <>
          <Reveal width="100%" height={{ base: "100%", xl: "28rem" }}>
            <Hero
              heading={heroContent?.title}
              description={heroContent?.description}
              image={
                heroContent?.image &&
                (urlFor(heroContent?.image?.asset?._ref) as unknown as string)
              }
              alt={heroContent?.image?.alt}
            />
          </Reveal>
          <Container maxW={{ md: "2xl", lg: "4xl", xl: "5xl" }} py={16}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              gap={{ base: 16, md: 2 }}
              align="center"
            >
              <ContactInfo />
              <ContactForm />
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

export default ContactUs;
