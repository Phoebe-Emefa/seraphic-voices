import { Box, Heading, Text } from "@chakra-ui/react";
import CustomButton from "@/components/shared/CustomButton";

export default function NotFound() {
  return (
    <Box minH="60dvh" display="flex" alignItems="center" justifyContent="center" px={6}>
      <Box textAlign="center" maxW="lg">
        <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} color="secondary.700" mb={3}>
          Page not found
        </Heading>
        <Text color="text" mb={8}>
          That page does not exist. Return home or see upcoming events.
        </Text>
        <CustomButton title="Home" href="/" />
      </Box>
    </Box>
  );
}
