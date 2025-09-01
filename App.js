import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
