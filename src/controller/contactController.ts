import { Request, Response } from "express";
import Contact from "../models/contactModel";
import { sendMail } from "../config/mailer";

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Contact.create({ name, email, message });


    const adminEmailHTML = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendMail(
      process.env.ADMIN_EMAIL!,
      "New Message from Portfolio Contact Form",
      adminEmailHTML
    );

    const userReplyHTML = `
  <h3>Hello ${name},</h3>

  <p>Thank you for contacting me. Your message has been successfully received.</p>

  <p>I appreciate your interest and the time you’ve taken to reach out. I will be reviewing your details shortly and will provide a comprehensive response as soon as possible. My goal is to ensure that all inquiries receive timely and thoughtful attention.</p>

  <p>If you have any additional information, documents, or questions you’d like to share before I respond, please feel free to reply to this email at your convenience.</p>

  <br/>
  <p>Sincerely,<br/><strong>Akshat Deep Astik</strong></p>
`;


    await sendMail(email, "Thanks for contacting me!", userReplyHTML);

    res.status(201).json({
      message: "Message submitted successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server error" });
  }
};
