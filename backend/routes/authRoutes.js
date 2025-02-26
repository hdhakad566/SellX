import express from "express";
import multer from "multer";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

// Multer Configuration for File Storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/signup", upload.single("photo"), signup);
router.post("/signin", signin);

export default router;
