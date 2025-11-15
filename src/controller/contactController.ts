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

    // 1️⃣ Email to admin
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

    // 2️⃣ Auto-reply to user
    const userReplyHTML = `
      <h3>Hey ${name},</h3>
      <p>Thanks for reaching out! 🙌</p>
      <p>I appreciate your time and will get back to you soon.</p>
      <br/>
      <p>Best,<br/>Akshat Deep Astik</p>
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

// 📨 Admin-only: Get all messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ Admin-only: Delete a message
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
