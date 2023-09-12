"use client";
import TeamCard from "@/components/about/TeamCard";
import { Grid } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
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

export const sopranoMembers = [
  {
    image: "/images/beautiful-woman.jpg",
    name: "Ewuradwoa Goode",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Magdelene Tosin Lanlehin",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Berlinda Boye",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Dorothy Okubadejo",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Bernice Asamoah",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Derrick Kpakpo Allotey",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Adwoa Asamoah",
  },
];

export const altoMembers = [
  {
    image: "/images/beautiful-woman.jpg",
    name: "Afua Baah",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Nancy Princess Bio",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Doris Hutchful",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Akua Buado",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Nana Awura Agyeman",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Ransford Sekyi",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Grisela Asamoah-Gyedu",
  },
];

export const tenorMembers = [
  {
    image: "/images/handsome-man.webp",
    name: "Afua BaahDaCosta Agyeman",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Charles  Leslie Vandyck",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Joel Smart",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Oscar Etorko-Gbeku",
  },
];

export const bassMembers = [
  {
    image: "/images/handsome-man.webp",
    name: "Albert Acquah",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Samuel Perez Ofori Dua",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Kwaku Agyeman Duah",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Benjamin Osei Boakye",
  },
];

export const organistsMembers = [
  {
    image: "/images/handsome-man.webp",
    name: "Samuel Wasley Asare Kusi (Music Director)",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Babatunde Okubadejo",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Joshua Kyeremeh",
  },
];
export const trumpetMembers = [
  {
    image: "/images/handsome-man.webp",
    name: "Gideon Boateng",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Richmond  Opoku Agyeman",
  },
];

export const teamTabs = [
  {
    label: "Soprano",
    comp: (
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)"}}
        gap={5}
        justifyItems="center"
        alignItems="center"
      >
        {sopranoMembers?.map((member) => (
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
        {altoMembers?.map((member) => (
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
        {tenorMembers?.map((member) => (
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
        {bassMembers?.map((member) => (
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
        {organistsMembers?.map((member) => (
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
        {trumpetMembers?.map((member) => (
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