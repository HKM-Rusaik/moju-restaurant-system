import { where, fn, col } from "sequelize";
import Staff from "../../models/Staff.js";
import Attendance from "../../models/Attendance.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createStaff = async (req, res) => {
  try {
    const { NIC, staffName, mobileNo, role } = req.body;

    // Encrypt the NIC to use as password
    const encryptedPassword = await bcrypt.hash(NIC, 10);

    // Create staff in the database
    const newStaff = await Staff.create({
      NIC,
      staffName,
      mobileNo,
      role,
      passwordHash: encryptedPassword, // Assuming there is a password field in your Staff model
    });

    // Return success response with the created staff object
    return res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: newStaff,
    });
  } catch (err) {
    console.error("Error creating staff:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating staff",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { NIC, password } = req.body;

    // Find the staff member in the database
    const staff = await Staff.findOne({ where: { NIC } });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Validate the password
    const passwordMatch = await bcrypt.compare(password, staff.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { NIC: staff.NIC, role: staff.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Expiration time
    );

    // Return the token as part of the response
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getStaffs = async (req, res) => {
  try {
    // Retrieve all staff members from the database
    const staff = await Staff.findAll();

    // Return the staff members as a JSON response
    return res.status(200).json(staff);
  } catch (err) {
    console.error("Error in getting staffs:", err);
    return res.status(500).json({ message: "Error in fetching staffs" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { NIC } = req.params;

    const staff = await Staff.findOne({ where: { NIC } });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Delete related records in attendance table
    await Attendance.destroy({ where: { NIC } });

    // Now delete the staff record
    await staff.destroy();
    res.status(200).json({ message: "Staff successfully deleted!" });
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).json({ message: "Error in deleting staff" });
  }
};

// Update Staff Function
export const updateStaff = async (req, res) => {
  try {
    const { NIC } = req.params;
    const { staffName, mobileNo, role } = req.body;

    const staff = await Staff.findOne({ where: { NIC } });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    staff.staffName = staffName !== undefined ? staffName : staff.staffName;
    staff.mobileNo = mobileNo !== undefined ? mobileNo : staff.mobileNo;
    staff.role = role !== undefined ? role : staff.role;

    await staff.save();

    res.status(200).json({ message: "Staff successfully updated!", staff });
  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(500).json({ message: "Error in updating staff" });
  }
};

