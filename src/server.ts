import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import contactRoutes from "./routes/contact.routes";
import cookieParser from "cookie-parser";

import http from "http";
import { Server } from "socket.io";

// Load environment variables
dotenv.config();

// Initialize app
const app: Application = express();

// Create HTTP server (IMPORTANT for socket.io)
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
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

// --- REAL-TIME VISITOR TRACKING ---

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  console.log("User connected:", socket.id);

  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    console.log("User disconnected:", socket.id);

    io.emit("onlineUsers", onlineUsers);
  });
});

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
