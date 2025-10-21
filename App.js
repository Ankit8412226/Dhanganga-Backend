import cookieParser from "cookie-parser";
import cors from "cors"; // ✅ Import CORS
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import authRoutes from "./routes/AuthenticationRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  "https://www.nayesochnayakadam.com",
  "https://admin-dhanganga-95aa.vercel.app",
  "http://localhost:3000", // optional, for local testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ allow cookies and authentication headers
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ✅ Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy 🚀",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});

export default app;
