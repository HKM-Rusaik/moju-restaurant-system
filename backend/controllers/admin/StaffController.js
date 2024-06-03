import { where } from "sequelize";
import Staff from "../../models/Staff.js";
import Attendance from "../../models/Attendance.js";

export const createStaff = async (req, res) => {
  try {
    const { NIC, staffName, mobileNo, role } = req.body;

    // Check if a staff member with the same NIC already exists
    const existingStaff = await Staff.findOne({ where: { NIC } });
    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: "A staff member with this NIC already exists",
      });
    }

    // Create staff in the database
    const newStaff = await Staff.create({
      NIC,
      staffName,
      mobileNo,
      role,
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
