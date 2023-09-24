"use client";
import Hero from "@/components/about/Hero";
import CustomList from "@/components/shared/CustomListItem";
import { SEO } from "@/components/shared/SEO";
import { donationInstructions } from "@/utils/misc";
import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";

const Donate = () => {
  return (
    <Box>
      <SEO
        title="Donate"
        description="Support Our Mission - Help us make a difference by donating today. Your contribution fuels our work and brings positive change to our community."
        path="/donate"
      />
      <Hero
        heading="Email-Transfer your Donation!"
        description="Easily send us a money transfer with Interac using our email- seraphicvoicestoronto@gmail.com"
        image="images/donate.jpg"
      />
      <VStack py={16} spacing={6} px={8}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", xl: "3xl" }}
          textAlign="center"
          color="secondary.700"
        >
          {" "}
          How to Send an Interac e-Transfer
        </Heading>
        <Box>
          <CustomList listItems={donationInstructions} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Donate;
