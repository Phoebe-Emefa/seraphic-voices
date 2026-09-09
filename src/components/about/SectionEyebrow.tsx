import { Box, HStack, Text } from "@chakra-ui/react";

type SectionEyebrowProps = {
  label: string;
  accent?: "navy" | "gold";
};

const SectionEyebrow = ({ label, accent = "navy" }: SectionEyebrowProps) => {
  const lineColor = accent === "gold" ? "secondary.500" : "secondary.700";
  const textColor = accent === "gold" ? "secondary.500" : "secondary.700";

  return (
    <HStack spacing={3} color={textColor}>
      <Box w={8} h="2px" bg={lineColor} />
      <Text
        fontSize={{ base: "2xs", sm: "xs" }}
        fontWeight="bold"
        letterSpacing="0.2em"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </HStack>
  );
};

export default SectionEyebrow;
