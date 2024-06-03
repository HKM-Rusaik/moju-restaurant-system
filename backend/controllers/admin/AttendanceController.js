import { where } from "sequelize";
import Attendance from "../../models/Attendance.js";
import Staff from "../../models/Staff.js";
import pkg from "pg";
const { defaults } = pkg;

export const createDailyAttendanceRecords = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const staffMembers = await Staff.findAll();
    //prepare attendance records
    const attendanceRecords = staffMembers.map((staff) => ({
      date: currentDate,
      NIC: staff.NIC,
    }));

    for (const record of attendanceRecords) {
      const [attendance, created] = await Attendance.findOrCreate({
        where: {
          date: record.date,
          NIC: record.NIC,
        },
        defaults: record,
      });

      if (created) {
        console.log(`Created attendance record for NIC: ${record.NIC}`);
      } else {
        console.log(`Attendance record for NIC: ${record.NIC} already exists`);
      }
    }
    res.status(200).json({
      message: "Attendance records created/ensured for all staff members.",
    });
  } catch (error) {
    console.error("Error creating attendance records:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateAttendance = async (req, res) => {
  const { NIC, type, time } = req.body;

  if (!NIC || !type || !time) {
    return res.status(400).json({ error: "NIC, type, and time are required" });
  }

  try {
    const currentDate = new Date().toISOString().split("T")[0];

    // Find the attendance record for the current date and NIC
    const attendance = await Attendance.findOne({
      where: {
        date: currentDate,
        NIC: NIC,
      },
    });

    if (!attendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    // Update the attendance record based on the type
    if (type === "comingIn") {
      attendance.comingIn = time;
    } else if (type === "goingOut") {
      attendance.goingOut = time;
      if (attendance.comingIn) {
        // Calculate worked hours
        const startTime = new Date(`${currentDate}T${attendance.comingIn}`);
        const endTime = new Date(`${currentDate}T${time}`);
        const workedHours = (endTime - startTime) / (1000 * 60 * 60); // in hours
        attendance.workedHours = workedHours.toFixed(2);
      }
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }

    await attendance.save();

    res.status(200).json({
      message: "Attendance updated successfully",
      attendance: {
        NIC: attendance.NIC,
        comingIn: attendance.comingIn,
        goingOut: attendance.goingOut,
        workedHours: attendance.workedHours,
      },
    });
  } catch (error) {
    console.error("Error updating attendance record:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    // Fetch attendance records for the current date
    const attendance = await Attendance.findAll({
      where: {
        date: currentDate,
      },
    });

    // Calculate worked hours for each person
    const workedHoursByNIC = {};
    attendance.forEach((record) => {
      const { NIC, comingIn, goingOut } = record;
      if (!workedHoursByNIC[NIC]) {
        workedHoursByNIC[NIC] = {
          hours: 0,
          minutes: 0,
        };
      }
      if (comingIn && goingOut) {
        const startTime = new Date(`${currentDate}T${comingIn}`);
        const endTime = new Date(`${currentDate}T${goingOut}`);
        const workedMilliseconds = endTime - startTime;
        const workedHours = workedMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
        const hours = Math.floor(workedHours);
        const minutes = Math.floor((workedHours - hours) * 60);
        workedHoursByNIC[NIC].hours += hours;
        workedHoursByNIC[NIC].minutes += minutes;
      }
    });

    // Merge worked hours with attendance records
    const attendanceWithWorkedHours = attendance.map((record) => {
      const { NIC } = record;
      const { hours, minutes } = workedHoursByNIC[NIC] || {
        hours: 0,
        minutes: 0,
      };
      return {
        ...record.toJSON(),
        workedHours: `${hours} hours ${minutes} minutes`,
      };
    });

    res.status(200).json(attendanceWithWorkedHours);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//create staff attendace of not in the attendance because he can be add for that day
export const createStaffAttendance = async (req, res) => {
  const { date, NIC, comingIn, goingOut, workedHours } = req.body;

  if (!date || !NIC) {
    return res.status(400).json({ error: "Date and NIC are required" });
  }

  try {
    const [attendance, created] = await Attendance.findOrCreate({
      where: {
        date: date,
        NIC: NIC,
      },
      defaults: {
        date: date,
        NIC: NIC,
        comingIn: comingIn,
        goingOut: goingOut,
        workedHours: workedHours,
      },
    });

    if (created) {
      return res
        .status(201)
        .json({ message: "Attendance created", attendance });
    } else {
      return res
        .status(200)
        .json({ message: "Attendance already exists", attendance });
    }
  } catch (error) {
    console.error("Error creating attendance:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
