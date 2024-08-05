import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.senderemail,
    pass: process.env.POEMAILPASSWORD,
  },
});

export async function sendEmail(to: string, body: string) {
  try {
    let address = process.env.senderemail as string;
    const mailOptions = {
      from: {
        name: 'chaitanya',
        address: address,
      },
      to: to,
      subject: 'email from zapier',
      text: body,
    };
    console.log({ address });
    console.log({ user: process.env.senderemail });
    console.log({ pass: process.env.POEMAILPASSWORD });
    await transporter.sendMail(mailOptions);
    return 'Email Sent Successfully';
  } catch (e) {
    return e;
  }
}
