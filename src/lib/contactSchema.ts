import * as Yup from "yup";

export const contactSchema = Yup.object({
  firstName: Yup.string().trim().max(80).required("First name is required"),
  lastName: Yup.string().trim().max(80).required("Last name is required"),
  email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
  message: Yup.string().trim().min(10, "Message is too short").max(4000).required("Message is required"),
  subject: Yup.string().trim().max(120).default("Message from Website"),
});

export type ContactPayload = Yup.InferType<typeof contactSchema>;
