import CustomButton from "@/components/shared/CustomButton";
import { Box, Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { HiOutlineCalendarDays } from "react-icons/hi2";

type UpcomingEventsEmptyProps = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaTitle?: string;
  ctaHref?: string;
};

const UpcomingEventsEmpty = ({
  eyebrow,
  heading,
  body,
  ctaTitle,
  ctaHref,
}: UpcomingEventsEmptyProps) => {
  if (!eyebrow && !heading && !body && !(ctaTitle && ctaHref)) {
    return null;
  }

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "minmax(11rem, 0.45fr) 1fr" }}
      bg="linear-gradient(135deg, #041a42 0%, #052155 52%, #031433 100%)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      boxShadow="0 28px 64px -24px rgba(4, 35, 92, 0.4)"
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="whiteAlpha.50"
        minH={{ base: "9rem", md: "auto" }}
        py={{ base: 8, md: 10 }}
        px={8}
        overflow="hidden"
      >
        <Box
          position="absolute"
          w="14rem"
          h="14rem"
          borderRadius="full"
          bg="secondary.500"
          opacity={0.08}
          top="-4rem"
          right="-3rem"
        />
        <Flex
          align="center"
          justify="center"
          w={{ base: "4.5rem", md: "5.5rem" }}
          h={{ base: "4.5rem", md: "5.5rem" }}
          borderRadius="full"
          border="1px solid"
          borderColor="whiteAlpha.200"
          bg="whiteAlpha.100"
        >
          <Icon as={HiOutlineCalendarDays} boxSize={{ base: 7, md: 8 }} color="secondary.500" />
        </Flex>
      </Flex>

      <Flex
        direction="column"
        justify="center"
        gap={{ base: 4, md: 5 }}
        p={{ base: 6, sm: 7, md: 8, lg: 10 }}
      >
        {eyebrow ? (
          <HStack spacing={2.5} color="whiteAlpha.700">
            <Box w={1.5} h={1.5} borderRadius="full" bg="secondary.500" flexShrink={0} />
            <Text
              fontSize="2xs"
              fontWeight="bold"
              letterSpacing="0.18em"
              textTransform="uppercase"
            >
              {eyebrow}
            </Text>
          </HStack>
        ) : null}

        <VStack align="flex-start" spacing={2}>
          {heading ? (
            <Heading
              as="p"
              fontSize={{ base: "xl", sm: "2xl", md: "2.25xl" }}
              fontWeight="bold"
              color="white"
              lineHeight={1.2}
              letterSpacing="-0.02em"
            >
              {heading}
            </Heading>
          ) : null}
          {body ? (
            <Text fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.700" maxW="30ch" lineHeight={1.55}>
              {body}
            </Text>
          ) : null}
        </VStack>

        {ctaTitle && ctaHref ? (
          <Box pt={1}>
            <CustomButton
              title={ctaTitle}
              href={ctaHref}
              width={{ base: "full", sm: "12.5rem" }}
              height="3.25rem"
              fontSize="sm"
            />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default UpcomingEventsEmpty;
