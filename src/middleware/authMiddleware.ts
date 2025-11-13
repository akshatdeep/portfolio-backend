import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../controller/authController";
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Check if blacklisted
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: "Token has been invalidated. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
