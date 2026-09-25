"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import TeamCard from "@/components/about/TeamCard";
import TeamGridSkeleton from "@/components/about/skeletons/TeamGridSkeleton";
import TeamMembersSkeleton from "@/components/about/skeletons/TeamMembersSkeleton";
import { useTeamPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { memberMatchesCategory } from "@/lib/teamCategories";
import { normalizeTeamPageData, resolveTeamListing } from "@/lib/teamPageContent";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineMusicalNote } from "react-icons/hi2";

const TeamMembers = () => {
  const pageQuery = useTeamPage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const handleTabChange = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsSwitching(true);
  };

  useEffect(() => {
    if (!isSwitching) return;
    const timer = window.setTimeout(() => setIsSwitching(false), 420);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isSwitching]);

  const listing = useMemo(() => {
    const { page } = normalizeTeamPageData(pageQuery.data?.page);
    return resolveTeamListing(page);
  }, [pageQuery.data]);

  const voiceTabs = useMemo(() => listing?.categories ?? [], [listing]);

  const membersByCategory = useMemo(() => {
    const map = new Map<string, NonNullable<typeof listing>["members"]>();

    for (const voice of voiceTabs) {
      map.set(
        voice.value,
        listing?.members.filter((item) => memberMatchesCategory(item, voice)) ?? [],
      );
    }

    return map;
  }, [listing, voiceTabs]);

  if (isCmsLoading(pageQuery)) {
    return <TeamMembersSkeleton />;
  }

  if (!listing || voiceTabs.length === 0) {
    return null;
  }

  const activeVoice = voiceTabs[activeIndex];
  const members = activeVoice ? membersByCategory.get(activeVoice.value) ?? [] : [];

  return (
    <Box
      as="section"
      aria-labelledby="team-members-heading"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          {listing.eyebrow || listing.intro ? (
            <VStack align="flex-start" spacing={4} maxW="40rem">
              {listing.eyebrow ? <SectionEyebrow label={listing.eyebrow} /> : null}
              {listing.intro ? (
                <Text
                  id="team-members-heading"
                  fontSize={{ base: "md", md: "lg" }}
                  color="secondary.700"
                  opacity={0.9}
                  lineHeight={1.75}
                  sx={{ textWrap: "pretty" }}
                >
                  {listing.intro}
                </Text>
              ) : null}
            </VStack>
          ) : null}

          <Box
            position={{ base: "sticky", md: "static" }}
            top={{ base: "4.5rem", md: "auto" }}
            zIndex={2}
            bg="secondary.100"
            py={{ base: 2, md: 0 }}
            mx={{ base: -4, sm: 0 }}
            px={{ base: 4, sm: 0 }}
          >
            <Flex
              gap={2}
              overflowX="auto"
              pb={1}
              sx={{
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                scrollSnapType: "x proximity",
              }}
            >
              {voiceTabs.map((voice, index) => {
                const count = membersByCategory.get(voice.value)?.length ?? 0;
                const isActive = index === activeIndex;

                return (
                  <Button
                    key={voice.label}
                    onClick={() => handleTabChange(index)}
                    flexShrink={0}
                    h="2.5rem"
                    px={{ base: 4, md: 5 }}
                    borderRadius="full"
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                    scrollSnapAlign="start"
                    bg={isActive ? "secondary.700" : "white"}
                    color={isActive ? "white" : "secondary.700"}
                    border="1px solid"
                    borderColor={isActive ? "secondary.700" : "blackAlpha.100"}
                    boxShadow={
                      isActive
                        ? "0 12px 24px -12px rgba(4, 35, 92, 0.45)"
                        : "0 8px 20px -16px rgba(4, 35, 92, 0.12)"
                    }
                    _hover={{
                      bg: isActive ? "secondary.700" : "white",
                      borderColor: isActive ? "secondary.700" : "secondary.500",
                    }}
                    _active={{ transform: "scale(0.98)" }}
                    aria-pressed={isActive}
                  >
                    {voice.label}
                    {count > 0 ? (
                      <Text
                        as="span"
                        ml={2}
                        fontSize="xs"
                        opacity={isActive ? 0.85 : 0.55}
                        fontWeight="medium"
                      >
                        {count}
                      </Text>
                    ) : null}
                  </Button>
                );
              })}
            </Flex>
          </Box>

          {isSwitching ? (
            <TeamGridSkeleton count={Math.max(members.length, 4)} />
          ) : members.length === 0 ? (
            <VStack
              spacing={4}
              py={{ base: 12, md: 16 }}
              px={6}
              borderRadius="xl"
              bg="white"
              border="1px solid"
              borderColor="blackAlpha.100"
              textAlign="center"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="3rem"
                h="3rem"
                borderRadius="full"
                bg="secondary.100"
                color="secondary.500"
              >
                <Icon as={HiOutlineMusicalNote} boxSize={5} />
              </Box>
              <Text fontSize="lg" fontWeight="semibold" color="secondary.700">
                No members listed yet
              </Text>
              <Text fontSize="md" color="text" maxW="28rem" lineHeight={1.7}>
                We are still updating this section. Check back soon to meet our{" "}
                {activeVoice.label.toLowerCase()} voices.
              </Text>
            </VStack>
          ) : (
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: 4, md: 6 }}
            >
              {members.map((member, index) => (
                <TeamCard
                  key={member._id || member.name}
                  item={member}
                  index={index}
                />
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default TeamMembers;
