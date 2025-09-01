import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";

import serviceRoutes from "./routes/serviceRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", serviceRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
