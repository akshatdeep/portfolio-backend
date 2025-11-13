import express from "express";
import { register, login, getMe, logout } from "../controller/authController";
import { isAuthenticated  } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMe);
router.post("/logout", isAuthenticated, logout);

export default router;
