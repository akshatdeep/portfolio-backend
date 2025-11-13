import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes"
// Load environment variables
dotenv.config();

// Initialize app
const app: Application = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Portfolio Backend API is running 🚀");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));






