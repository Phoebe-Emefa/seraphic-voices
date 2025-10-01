"use client"
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Badge,
  useMediaQuery,
  Icon,
  Link,
  Grid,
} from "@chakra-ui/react"
import { useQuery } from "react-query"
import { groq } from "next-sanity"
import { client, urlFor } from "../../../../sanity/sanity-client"
import { SEO } from "@/components/shared/SEO"
import Reveal from "@/components/shared/Reveal"
import { FaMapMarkerAlt, FaRegCalendarAlt, FaClock, FaTicketAlt, FaArrowLeft } from "react-icons/fa"
import moment from "moment-timezone"
import ReactPlayer from "react-player"
import { useRouter } from "next/navigation"
import CustomButton from "@/components/shared/CustomButton"

// Simple function to render portable text content
 const renderPortableText = (content: any) => {
  if (!content || !Array.isArray(content)) return null

  return content.map((block: any, index: number) => {
    if (block._type === "block") {
      const text = block.children
        ?.map((child: any) => {
          let text = child.text || ""

          // Apply marks (bold, italic, etc.)
          if (child.marks) {
            child.marks.forEach((mark: string) => {
              switch (mark) {
                case "strong":
                  text = `<strong>${text}</strong>`
                  break
                case "em":
                  text = `<em>${text}</em>`
                  break
                case "underline":
                  text = `<u>${text}</u>`
                  break
              }
            })
          }

          return text
        })
        .join("")

      // Apply block styles
      switch (block.style) {
        case "h1":
          return (
            <Heading key={index} as="h1" fontSize="2xl" mb={4}>
              {text}
            </Heading>
          )
        case "h2":
          return (
            <Heading key={index} as="h2" fontSize="xl" mb={3}>
              {text}
            </Heading>
          )
        case "h3":
          return (
            <Heading key={index} as="h3" fontSize="lg" mb={2}>
              {text}
            </Heading>
          )
        case "blockquote":
          return (
            <Box
              key={index}
              as="blockquote"
              borderLeft="4px solid"
              borderLeftColor="primary.500"
              pl={4}
              my={4}
              fontStyle="italic"
            >
              {text}
            </Box>
          )
        default:
          return <Text key={index} mb={2} dangerouslySetInnerHTML={{ __html: text }} />
      }
    }
    return null
  })
}

const EventDetailsPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const [isMobile] = useMediaQuery("(max-width: 768px)")
  const [isTablet] = useMediaQuery("(max-width: 992px)")

  const { isLoading, data: event } = useQuery(["event", params.slug], async () => {
    return client.fetch(groq`*[_type == "events" && slug.current == "${params.slug}"][0]`)
  })

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Box>
    )
  }

  if (!event) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Event not found</Text>
          <Button onClick={() => router.back()}>Go Back</Button>
        </VStack>
      </Box>
    )
  }

  const formatDate = (date: string) => {
    return moment(date).tz("America/Toronto").format("MMMM Do, YYYY")
  }

  const formatTime = (date: string) => {
    return moment(date).tz("America/Toronto").format("h:mm A")
  }

  const isUpcoming = new Date(event.start_date) > new Date()

  return (
    <>
      <SEO
        title={event.title}
        description={typeof event.description === "string" ? event.description : "Event details and information"}
        path={`/events/${params.slug}`}
      />

      {/* Hero Section */}
      <Box position="relative" minH={{ base: "auto", md: "100vh" }} overflow="hidden">
        {/* Background Image/Video */}
        <Box position="absolute" top={0} left={0} width="100%" height="100%" zIndex={1}>
          {event.video ? (
            <ReactPlayer
              url={event.video}
              width="100%"
              height="100%"
              playing={false}
              muted
              loop
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Image
              src={(urlFor(event.image?.asset?._ref) as unknown as string) || "/placeholder.svg"}
              alt={event.image?.alt || event.title}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          )}
          {/* Overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)"
            zIndex={2}
          />
        </Box>

        {/* Back Button */}
        <Box position="absolute" top={{ base: 4, md: 8 }} left={{ base: 4, md: 8 }} zIndex={10}>
          <Button
            leftIcon={<FaArrowLeft />}
            variant="ghost"
            color="white"
            bg="rgba(255,255,255,0.1)"
            backdropFilter="blur(10px)"
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
            onClick={() => router.back()}
            size={{ base: "sm", md: "md" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Box as="span" display={{ base: "none", sm: "inline" }}>
              Back to Events
            </Box>
            <Box as="span" display={{ base: "inline", sm: "none" }}>
              Back
            </Box>
          </Button>
        </Box>

        {/* Content */}
        <Container
          maxW="7xl"
          position="relative"
          zIndex={5}
          minH={{ base: "auto", md: "100vh" }}
          display="flex"
          alignItems="center"
          py={{ base: 20, md: 0 }}
          px={{ base: 4, md: 8 }}
        >
          <VStack spacing={{ base: 4, md: 8 }} align="start" color="white" maxW="4xl">
            <Reveal>
              <HStack spacing={{ base: 2, md: 4 }} mb={{ base: 2, md: 4 }} flexWrap="wrap">
                {isUpcoming && (
                  <Badge
                    bg="primary.500"
                    color="white"
                    px={{ base: 3, md: 4 }}
                    py={{ base: 1, md: 2 }}
                    borderRadius="full"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="bold"
                  >
                    Upcoming Event
                  </Badge>
                )}
                <Badge
                  bg="secondary.500"
                  color="white"
                  px={{ base: 3, md: 4 }}
                  py={{ base: 1, md: 2 }}
                  borderRadius="full"
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  {event.category || "Concert"}
                </Badge>
              </HStack>
            </Reveal>

            <Reveal>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
                fontWeight="bold"
                lineHeight="shorter"
                textShadow="2px 2px 4px rgba(0,0,0,0.5)"
              >
                {event.title}
              </Heading>
            </Reveal>

            <Reveal>
              <Box
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                maxW="2xl"
                lineHeight="tall"
                textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                color="white"
              >
                {renderPortableText(event.description)}
              </Box>
            </Reveal>

            <Reveal>
              <VStack spacing={{ base: 3, md: 4 }} align="start" mt={{ base: 4, md: 8 }}>
                <VStack spacing={3} align="start" width="100%">
                  <HStack spacing={3} color="white">
                    <Icon as={FaRegCalendarAlt} boxSize={{ base: 4, md: 5 }} />
                    <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="semibold">
                      {formatDate(event.start_date)}
                    </Text>
                  </HStack>
                  <HStack spacing={3} color="white">
                    <Icon as={FaClock} boxSize={{ base: 4, md: 5 }} />
                    <Text fontSize={{ base: "sm", md: "lg" }}>
                      {formatTime(event.start_date)} - {formatTime(event.end_date)}
                    </Text>
                  </HStack>
                </VStack>

                <HStack spacing={3} color="white">
                  <Icon as={FaMapMarkerAlt} boxSize={{ base: 4, md: 5 }} />
                  <Text fontSize={{ base: "sm", md: "lg" }}>{event.location}</Text>
                </HStack>
              </VStack>
            </Reveal>

            {isUpcoming && event.ticket_url && (
              <Reveal>
                <Link href={event.ticket_url} isExternal width={{ base: "100%", sm: "auto" }}>
                  <CustomButton title="Purchase Tickets" width="100%" />
                </Link>
              </Reveal>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Event Details Section */}
      <Box bg="secondary.100" py={20}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12} alignItems="start">
            {/* Main Content */}
            <VStack spacing={8} align="start">
              <Reveal>
                <Heading as="h2" fontSize="3xl" color="secondary.700">
                  Event Details
                </Heading>
              </Reveal>

              <Reveal>
                <Box fontSize="lg" lineHeight="tall" color="gray.600">
                  {renderPortableText(event.description)}
                </Box>
              </Reveal>

              {event.additional_info && (
                <Reveal>
                  <Box
                    bg="white"
                    p={8}
                    borderRadius="xl"
                    boxShadow="lg"
                    borderLeft="4px solid"
                    borderLeftColor="primary.500"
                  >
                    <Heading as="h3" fontSize="xl" mb={4} color="secondary.700">
                      Additional Information
                    </Heading>
                    <Text color="gray.600">{event.additional_info}</Text>
                  </Box>
                </Reveal>
              )}
            </VStack>

            {/* Sidebar */}
            <VStack spacing={6} align="stretch">
              <Reveal>
                <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" border="1px solid" borderColor="gray.200">
                  <Heading as="h3" fontSize="xl" mb={6} color="secondary.700">
                    Event Information
                  </Heading>

                  <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                      <Icon as={FaRegCalendarAlt} color="primary.500" boxSize={5} />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                          Date
                        </Text>
                        <Text fontSize="md" fontWeight="semibold">
                          {formatDate(event.start_date)}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack spacing={4}>
                      <Icon as={FaClock} color="primary.500" boxSize={5} />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                          Time
                        </Text>
                        <Text fontSize="md" fontWeight="semibold">
                          {formatTime(event.start_date)} - {formatTime(event.end_date)}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack spacing={4} align="start">
                      <Icon as={FaMapMarkerAlt} color="primary.500" boxSize={5} mt={1} />
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="gray.500" fontWeight="semibold">
                          Location
                        </Text>
                        <Text fontSize="md" fontWeight="semibold">
                          {event.location}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </Reveal>

              {isUpcoming && event.ticket_url && (
                <Reveal>
                  <Box
                    bg="primary.50"
                    p={8}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="primary.200"
                    textAlign="center"
                  >
                    <Icon as={FaTicketAlt} boxSize={12} color="primary.500" mb={4} />
                    <Heading as="h3" fontSize="xl" mb={4} color="primary.700">
                      Get Your Tickets
                    </Heading>
                    <Text color="primary.600" mb={6}>
                      Don't miss out on this amazing event!
                    </Text>
                    <Link href={event.ticket_url} isExternal>
                      <CustomButton width="100%" title="Purchase Tickets" />
                    </Link>
                  </Box>
                </Reveal>
              )}
            </VStack>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default EventDetailsPage
