// import nodemailer from "nodemailer";

// export const sendMail = async (to: string, subject: string, html: string) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Akshat Deep Astik" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`✅ Email sent successfully to ${to}`);
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//   }
// };



// utils/mailer.ts (or wherever it is)

import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Akshat Deep Astik" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email failed:", error);
    throw error; // ← THIS IS THE MOST IMPORTANT LINE
  }
};