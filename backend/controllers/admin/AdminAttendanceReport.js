import { Op, fn, col } from "sequelize";
import Staff from "../../models/Staff.js";
import Attendance from "../../models/Attendance.js";

const getStartDateForDuration = (duration) => {
  const now = new Date();
  let startDate;

  switch (duration) {
    case "today":
      startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - 7)); // Start of one week ago
      break;
    case "month":
      startDate = new Date(now.setMonth(now.getMonth() - 1)); // Start of one month ago
      break;
    default:
      throw new Error("Invalid duration specified");
  }

  return startDate;
};

// Get counts of each role type
export const getCountsByRole = async (req, res) => {
  try {
    const counts = await Staff.findAll({
      attributes: ["role", [fn("COUNT", col("role")), "count"]],
      group: ["role"],
    });

    // Format the response
    const formattedCounts = counts.map((count) => ({
      name: count.role,
      value: parseInt(count.dataValues.count),
    }));

    // Return the counts as a JSON response
    return res.status(200).json(formattedCounts);
  } catch (err) {
    console.error("Error in getting counts by role:", err);
    return res
      .status(500)
      .json({ message: "Error in fetching counts by role" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { duration } = req.params;
    const startDate = getStartDate(duration);
    const endDate = new Date();

    // Fetch attendance records for the specified duration
    const attendance = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Calculate worked hours for each person
    const workedHoursByNIC = {};
    attendance.forEach((record) => {
      const { NIC, date, comingIn, goingOut } = record;
      if (!workedHoursByNIC[NIC]) {
        workedHoursByNIC[NIC] = {
          hours: 0,
          minutes: 0,
        };
      }
      if (comingIn && goingOut) {
        const startTime = new Date(`${date}T${comingIn}`);
        const endTime = new Date(`${date}T${goingOut}`);
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
    res.status(500).json({ error: error.message });
  }
};
const countEmployeesWhoWorked = (attendance) => {
  const dateEmployeeCount = {};

  attendance.forEach((record) => {
    const { date, comingIn } = record;
    if (comingIn !== null) {
      if (!dateEmployeeCount[date]) {
        dateEmployeeCount[date] = 0;
      }
      dateEmployeeCount[date]++;
    }
  });

  return Object.keys(dateEmployeeCount).map((date) => ({
    orderDate: date,
    totalWorkedEmployees: dateEmployeeCount[date],
  }));
};

export const getWorkedEmployees = async (req, res) => {
  try {
    const { duration } = req.params;
    const startDate = getStartDateForDuration(duration);
    const endDate = new Date();

    // Fetch attendance records for the specified duration
    const attendance = await Attendance.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // Count the number of employees who worked each day
    const employeeCountByDate = countEmployeesWhoWorked(attendance);

    res.status(200).json(employeeCountByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
