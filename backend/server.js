import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import db from "../backend/db.js";

dotenv.config();
console.log("Database User:", process.env.DB_USER);  // Debugging
console.log("Database Password:", process.env.DB_PASSWORD);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
