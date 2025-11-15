import express from "express";
import {
  submitContact,
  getMessages,
  deleteMessage,
} from "../controller/contactController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

// Public route — submit contact form
router.post("/", submitContact);

// Admin routes
router.get("/", isAuthenticated, getMessages);
router.delete("/:id", isAuthenticated, deleteMessage);

export default router;