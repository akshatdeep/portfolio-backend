import express from "express";
import {
  submitContact,
  getMessages,
  deleteMessage,
} from "../controller/contactController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", submitContact);

router.get("/", isAuthenticated, getMessages);
router.delete("/:id", isAuthenticated, deleteMessage);

export default router;