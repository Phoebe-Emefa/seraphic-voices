"use client";
import TeamCard from "@/components/about/TeamCard";
import { Grid } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLocationDot, FaYoutube } from "react-icons/fa6";
import {FaPhoneAlt} from "react-icons/fa"
import {MdEmail} from "react-icons/md"

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
    label: "Contact Us",
    path: "/contact-us",
  },
];


export const teamTabs = (sopranoMembers: any,altoMembers: any,tenorMembers: any,bassMembers: any,organistMembers: any,trumpetersMembers: any) => [
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
];


export const contactInfo = [
  {
    name: "Address",
    value: "House Number, Street Name, Town, Country",
    icon: FaLocationDot
  },
    {
    name: "Phone Number",
    value: "+233 232 333 333",
    icon: FaPhoneAlt
  },
    {
    name: "Email",
    value: "seraphicvoicestoronto@gmail.com",
    icon: MdEmail,
    isLink: true
  }
]

export const donationInstructions = [
    "Login into your online bank account",
    "Choose Interac e-Transfer within the Transfer/Payment menu options",
    "Select a recipient by entering our email address (seraphicvoicestoronto@gmail.com)",
    "Fill in the donation information (amount, account from which withdraw the funds, etc)",
    "Follow the instruction to confirm the information and complete the transfer"
  
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