import { where } from "sequelize";
import bcrypt from "bcrypt";
import Admin from "../../models/admin.js";
import jwt from "jsonwebtoken";

export const createAdmin = async (req, res) => {
  const { userName, password } = req.body;

  // Check if userName and password are provided
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Check if an admin with the same userName already exists
    const existingAdmin = await Admin.findOne({
      where: { userName },
    });

    if (existingAdmin) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await Admin.create({
      userName,
      password: hashedPassword,
    });

    // Send success response
    res
      .status(201)
      .json({ message: "Admin created successfully.", admin: newAdmin });
  } catch (err) {
    // Handle errors
    console.error("Error creating admin:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const loginAdmin = async (req, res) => {
  const { userName, password } = req.body;

  // Check if userName and password are provided
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Retrieve the admin from the database
    const admin = await Admin.findOne({
      where: { userName },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin.adminId, userName: admin.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send success response with the JWT token
    res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (err) {
    // Handle errors
    console.error("Error logging in admin:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
