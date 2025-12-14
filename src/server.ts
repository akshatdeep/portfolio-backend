// src/server.ts
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import contactRoutes from "./routes/contact.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();


const WHITELIST = [
  "http://localhost:5173",
  "https://portfolio-pi-sepia-70.vercel.app"
];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin as string | undefined;

  if (!origin) return next();

  if (WHITELIST.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    return next();
  }

  return res.status(403).json({ error: "CORS blocked" });
});


app.use(express.json());
app.use(cookieParser());


(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
})();


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Portfolio Backend API is running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
