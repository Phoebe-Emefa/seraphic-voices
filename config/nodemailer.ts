import nodemailer from "nodemailer";

const Email = process.env.EMAIL;
const password = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "zoho",
  auth: {
    user: Email,
    pass: password,
  },
});

export const mailOptions = {
  from: Email,
  to: Email,
};
