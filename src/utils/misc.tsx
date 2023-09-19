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
    image: "/images/Adwoa-Good.jpg",
    name: "Ewuradwoa Goode",
  },
  {
    image: "/images/Tosin.jpg",
    name: "Magdelene Tosin Lanlehin",
  },
  {
    image: "/images/Belinde-Boye.jpg",
    name: "Berlinda Boye",
  },
  {
    image: "/images/Dorothy.jpg",
    name: "Dorothy Okubadejo",
  },
  {
    image: "/images/Bernice-Asamoah.jpg",
    name: "Bernice Asamoah",
  },
  {
    image: "/images/Derrick-Allortey.jpg",
    name: "Derrick Kpakpo Allotey",
  },
  {
    image: "/images/Adwoa-Asamoah.jpg",
    name: "Adwoa Asamoah",
  },
];

export const altoMembers = [
  {
    image: "/images/Afuah-Baah.jpeg",
    name: "Afua Baah",
  },
  {
    image: "/images/Nancy-Bio.jpg",
    name: "Nancy Princess Bio",
  },
  {
    image: "/images/Doris-Hutchful.jpg",
    name: "Doris Hutchful",
  },
  {
    image: "/images/Akua.jpeg",
    name: "Akua Buado",
  },
  {
    image: "/images/Nana-Awura.jpg",
    name: "Nana Awura Agyeman",
  },
  {
    image: "/images/Ransford-Seyi.jpg",
    name: "Ransford Sekyi",
  },
  {
    image: "/images/beautiful-woman.jpg",
    name: "Grisela Asamoah-Gyedu",
  },
];

export const tenorMembers = [
  {
    image: "/images/Da-Coasta.jpg",
    name: "Afua BaahDaCosta Agyeman",
  },
  {
    image: "/images/Charles-Leslie.jpg",
    name: "Charles  Leslie Vandyck",
  },
  {
    image: "/images/handsome-man.webp",
    name: "Joel Smart",
  },
  {
    image: "/images/oscar-Gbeku.jpg",
    name: "Oscar Etorko-Gbeku",
  },
];

export const bassMembers = [
  {
    image: "/images/Albert-Acquah.jpg",
    name: "Albert Acquah",
  },
  {
    image: "/images/Samuel-Duah.jpeg",
    name: "Samuel Perez Ofori Dua",
  },
  {
    image: "/images/Kwaku-Agyemang.jpg",
    name: "Kwaku Agyeman Duah",
  },
  {
    image: "/images/Benjamin-Osei.jpg",
    name: "Benjamin Osei Boakye",
  },
];

export const organistsMembers = [
  {
    image: "/images/Sam-Wesley.jpg",
    name: "Samuel Wesley Asare Kusi (Music Director)",
  },
  {
    image: "/images/Babatunde.jpg",
    name: "Babatunde Okubadejo",
  },
  {
    image: "/images/Joshua-Kyeremeh.jpg",
    name: "Joshua Kyeremeh",
  },
];
export const trumpetMembers = [
  {
    image: "/images/Gideon-Boateng.jpg",
    name: "Gideon Boateng",
  },
  {
    image: "/images/Richmond-Opoku.jpg",
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