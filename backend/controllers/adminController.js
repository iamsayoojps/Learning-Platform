import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Add Admin
export const addAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exists = await Admin.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
