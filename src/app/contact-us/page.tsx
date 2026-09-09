import ContactUsPage from "@/components/contact/ContactUsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to Seraphic Voices of Toronto for inquiries and assistance.",
};

export default function Page() {
  return <ContactUsPage />;
}
