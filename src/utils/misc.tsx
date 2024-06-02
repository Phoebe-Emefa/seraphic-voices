"use client";
import TeamCard from "@/components/about/TeamCard";
import { Grid, Text, VStack } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLocationDot, FaYoutube } from "react-icons/fa6";
import {FaPhoneAlt} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import EventCard from "@/components/shared/EventCard";

export const menus = [
  {
    label: "Home",
    path: "/",
  },
    {
    label: "Who We Are",
    path: "/about-us",
  },
      {
    label: "Our Team",
    path: "/about-us/our-team",
  },

  {
    label: "Events",
    path: "/events",
  },
  
  {
    label: "Gallery",
    path: "/gallery",
  },
  {
    label: "Contact Us",
    path: "/contact-us",
  },
];


export const teamTabs = (conductorMembers: any, sopranoMembers: any,altoMembers: any,tenorMembers: any,bassMembers: any,organistMembers: any,trumpetersMembers: any) => [
 
  {
    label: "Soprano",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="start"
      >
        {sopranoMembers?.map((member: any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
  {
    label: "Alto",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {altoMembers?.map((member: any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
  {
    label: "Tenor",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {tenorMembers?.map((member: any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
  {
    label: "Bass",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {bassMembers?.map((member: any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
  {
    label: "Organists",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {organistMembers?.map((member:any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
  {
    label: "Trumpeters",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {trumpetersMembers?.map((member: any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
     {
    label: "Choir Conductor",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {conductorMembers?.map((member: any) => (
          <TeamCard key={member?.name} item={member} />
        ))}
      </Grid>
    ),
  },
  
];

export const eventTabs = (upcomingEvents: any, pastEvents: any) => [
 
  {
    label: "Upcoming Events",
    comp: (
      <>
       {upcomingEvents?.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={6}
                mt={6}
                mb={4}
              >
                {upcomingEvents?.map((item: any) => (
                  <EventCard key={item} event={item} />
                ))}
              </Grid>
            ) : (
              <VStack width="full" textAlign="center" mt={4}>
                <Text fontSize="xl" maxW="lg">
                  We currently have no upcoming events. Please stay tuned for
                  future updates and exciting happenings!
                </Text>
              </VStack>
            )}
      </>
    ),
  },

  {
    label: "Past Events",
    comp: (
      <>
       {pastEvents?.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={6}
                mt={6}
                mb={4}
              >
                {pastEvents?.map((item: any) => (
                  <EventCard key={item} event={item} />
                ))}
              </Grid>
            ) : (
              <VStack width="full" textAlign="center" mt={4}>
                <Text fontSize="xl" maxW="lg">
                  No events available
                </Text>
              </VStack>
            )}
      </>
    ),
  },

 

  
];

export const contactInfo = (data: any) => [
  {
    name: "Address",
    value: data?.address,
    icon: FaLocationDot
  },
    {
    name: "Phone Number",
    value: data?.phoneNumber,
    icon: FaPhoneAlt
  },
    {
    name: "Email",
    value: data?.email,
    icon: MdEmail,
    isLink: true
  }
]



export const socials = [
   {
    icon: FaFacebook,
    link: "https://web.facebook.com/profile.php?id=100064140482985",
  },
  {
    icon: FaYoutube,
    link: "https://www.youtube.com/channel/UCW_aWGQSe4kN9vKA1Hd_qVg",
  },
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/seraphicvoicesoftoronto/?hl=en",
  },

];

export const upcomingEvents = [
  {
    image: "/images/sera5th-desktop.png",
    hasVideo: true,
    video: "https://www.youtube.com/embed/eGBo30uHB8Y?si=UNWRfutglE4LT2hl",
    alt: "Image Alt",
    title: "God's Praise 2024",
    startDate: "January, 23 2024",
    endDate: "January, 23 2024",
    location: "Accra, Ghana",
    description: "Our 5th annivesary abc d abc ejdhbs svgdsvsd jhf. We hfd fhvbdvf hvg gsvdvs dgvdsvd "
  },
  {
    image: "/images/sera5th-desktop.png",
    alt: "Image Alt",
    title: "God's Praise 2024",
    startDate: "January, 23 2024",
    endDate: "January, 23 2024",
    location: "Accra, Ghana",
    description: "Our 5th annivesary abc d abc ejdhbs svgdsvsd jhf. We hfd fhvbdvf hvg gsvdvs dgvdsvd "
  }
]
export const pastEvents = [
  {
    image: "/images/sera5th-desktop.png",
    alt: "Image Alt",
    title: "God's Praise 2024",
    startDate: "January, 23 2024",
    endDate: "January, 23 2024",
    location: "Accra, Ghana",
    description: "Our 5th annivesary abc d abc ejdhbs svgdsvsd jhf. We hfd fhvbdvf hvg gsvdvs dgvdsvd "
  },
  {
    image: "/images/sera5th-desktop.png",
    alt: "Image Alt",
    title: "God's Praise 2024",
    startDate: "January, 23 2024",
    endDate: "January, 23 2024",
    location: "Accra, Ghana"
  }
]

export const truncateString = (str: string, maxLength: number) => {
  if (str?.length <= maxLength) {
    return str;
  } else {
    return str?.slice(0, maxLength) + "...";
  }
};