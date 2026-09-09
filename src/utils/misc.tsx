import { FaFacebook, FaInstagram, FaLocationDot, FaYoutube } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const menus = [
  { label: "Home", path: "/" },
  { label: "Who We Are", path: "/about-us" },
  { label: "Our Team", path: "/about-us/our-team" },
  { label: "Events", path: "/events" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact-us" },
];

export const TEAM_VOICES = [
  { label: "Soprano", category: "Soprano" },
  { label: "Alto", category: "Alto" },
  { label: "Tenor", category: "Tenor" },
  { label: "Bass", category: "Bass" },
  { label: "Organists", category: "Organists" },
  { label: "Trumpeters", category: "Trumpeters" },
  { label: "Choir Conductor", category: "Conductor" },
] as const;

export const contactInfo = (data: any) => [
  { name: "Address", value: data?.address, icon: FaLocationDot },
  { name: "Phone Number", value: data?.phoneNumber, icon: FaPhoneAlt },
  { name: "Email", value: data?.email, icon: MdEmail, isLink: true },
];

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
