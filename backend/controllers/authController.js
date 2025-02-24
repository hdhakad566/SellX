import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

// User Signup
export const signup = (req, res) => {
  const { fullname, email, password, photo } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) return res.status(400).json({ error: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    db.query(
      "INSERT INTO users (fullname, email, password, photo) VALUES (?, ?, ?, ?)",
      [fullname, email, hashedPassword, photo],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

// User Signin
export const signin = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) return res.status(400).json({ error: "Invalid email or password" });

    const user = results[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token, user: { id: user.id, fullname: user.fullname, email: user.email, photo: user.photo } });
  });
};
