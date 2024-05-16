import Staff from "../../models/Staff.js";

export const createStaff = async (req, res) => {
  try {
    const { NIC, staffName, mobileNo, role } = req.body;
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
