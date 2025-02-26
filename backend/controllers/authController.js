import db from "../db.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Check if the user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.query(
        "INSERT INTO users (fullname, email, password, photo) VALUES (?, ?, ?, ?)",
        [fullname, email, hashedPassword, photo],
        (err, result) => {
          if (err) return res.status(500).json({ error: "Signup failed" });

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Signup error" });
  }
};

// Signin Controller
export const signin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) return res.status(400).json({ error: "Invalid email or password" });

    const user = results[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Debugging: Log user and token
    console.log("User Data:", user);
    console.log("Generated Token:", token);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        photo: user.photo ? `http://localhost:5000${user.photo}` : null,
      },
    });
  });
};
