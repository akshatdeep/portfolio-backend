import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import contactRoutes from "./routes/contact.routes";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize app
const app: Application = express();

// --- CORS whitelist & options ---
const whitelist = [
  "http://localhost:5173",
  "https://client-eight-liard-57.vercel.app" // Your Vercel frontend URL
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow mobile apps, curl, etc.
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed by server"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// Apply CORS once
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Portfolio Backend API is running 🚀");
});

// ================================
// Start Server
// ================================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
