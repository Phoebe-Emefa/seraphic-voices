"use client";

import type { ContactDetailsContent } from "@/lib/contactPageContent";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { BsArrowUpRight } from "react-icons/bs";

type ContactRow = {
  label: string;
  value: string;
  icon: IconType;
  isLink?: boolean;
  href?: string;
};

function ContactInfoCard({ row }: { row: ContactRow }) {
  const content = row.isLink ? (
    <Link
      href={row.href || `mailto:${row.value}`}
      fontSize={{ base: "sm", md: "md" }}
      color="secondary.700"
      fontWeight="medium"
      _hover={{ color: "secondary.500", textDecoration: "none" }}
    >
      {row.value}
    </Link>
  ) : (
    <Text fontSize={{ base: "sm", md: "md" }} color="secondary.700" fontWeight="medium" lineHeight={1.6}>
      {row.value}
    </Text>
  );

  return (
    <Flex
      align="flex-start"
      gap={4}
      p={{ base: 4, md: 5 }}
      borderRadius="xl"
      bg="white"
      border="1px solid"
      borderColor="blackAlpha.50"
      boxShadow="0 16px 40px -24px rgba(4, 35, 92, 0.2)"
      w="full"
      minW={0}
      transition="box-shadow 0.3s ease, border-color 0.3s ease"
      _hover={{
        borderColor: "secondary.500",
        boxShadow: "0 20px 48px -20px rgba(4, 35, 92, 0.28)",
      }}
    >
      <Flex
        align="center"
        justify="center"
        w={11}
        h={11}
        borderRadius="full"
        bg="secondary.100"
        flexShrink={0}
      >
        <Icon as={row.icon} boxSize={5} color="secondary.700" />
      </Flex>
      <Box flex={1} minW={0}>
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="0.12em"
          textTransform="uppercase"
          color="secondary.500"
          mb={1}
        >
          {row.label}
        </Text>
        {content}
      </Box>
    </Flex>
  );
}

const ContactInfo = ({ details }: { details: ContactDetailsContent }) => {
  return (
    <VStack align="stretch" spacing={{ base: 5, md: 6 }} w="full" minW={0}>
      {details.title ? (
        <Box>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="secondary.700"
            letterSpacing="-0.02em"
            mb={2}
          >
            {details.title}
          </Heading>
          <Box w="2.5rem" h="2px" bg="secondary.500" />
        </Box>
      ) : null}

      {details.rows.length > 0 ? (
        <VStack spacing={4} align="stretch" w="full">
          {details.rows.map((row) => (
            <ContactInfoCard key={row.label} row={row} />
          ))}
        </VStack>
      ) : null}

      {details.socials.length > 0 ? (
        <Box pt={2}>
          {details.socialLabel ? (
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="secondary.700"
              opacity={0.55}
              mb={3}
            >
              {details.socialLabel}
            </Text>
          ) : null}
          <HStack spacing={3}>
            {details.socials.map((social) => (
              <IconButton
                key={social.url}
                as="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                icon={<Icon as={social.icon} boxSize={4} />}
                size="md"
                borderRadius="full"
                variant="outline"
                borderColor="blackAlpha.100"
                bg="white"
                color="secondary.700"
                _hover={{
                  bg: "secondary.700",
                  color: "white",
                  borderColor: "secondary.700",
                }}
              />
            ))}
          </HStack>
        </Box>
      ) : null}

      {details.bookingPrompt && details.bookingLinkLabel && details.bookingLinkHref ? (
        <Flex
          align="center"
          gap={2}
          pt={2}
          color="secondary.700"
          opacity={0.75}
          fontSize="sm"
          flexWrap="wrap"
        >
          <Text>{details.bookingPrompt}</Text>
          <Link
            href={details.bookingLinkHref}
            display="inline-flex"
            alignItems="center"
            gap={1}
            fontWeight="semibold"
            color="secondary.700"
            _hover={{ color: "secondary.500", textDecoration: "none" }}
          >
            {details.bookingLinkLabel}
            <BsArrowUpRight />
          </Link>
        </Flex>
      ) : null}
    </VStack>
  );
};

export default ContactInfo;
