import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import axios from "axios.js";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const Attendance = () => {
  const [staffs, setStaffs] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [staffAttendance, setStaffAttendance] = useState([]);
  const [message, setMessage] = useState("");

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const formattedTime = today.toLocaleTimeString();
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const getStaffs = async () => {
      const response = await axios.get("/admin/staffs");
      setStaffs(response.data);
    };

    const getAttendance = async () => {
      const response = await axios.get("/admin/attendance");
      setStaffAttendance(response.data);
    };

    const createDailyAttendance = async () => {
      const lastAttendanceDate = localStorage.getItem("lastAttendanceDate");
      if (lastAttendanceDate === currentDate) {
        setMessage("Attendance records have already been created for today.");
        return;
      }

      try {
        const response = await axios.post("/admin/attendance/create-daily");
        if (response.status === 200) {
          localStorage.setItem("lastAttendanceDate", currentDate);
          setMessage("Attendance records created for today.");
        } else {
          setMessage("Failed to create attendance records.");
        }
      } catch (error) {
        console.error("Error creating attendance records:", error);
        setMessage("Error creating attendance records.");
      }
    };

    getStaffs();
    getAttendance();
    createDailyAttendance();
  }, [attendance]);

  console.log(staffAttendance);
  console.log(staffs);

  const checkAndCreateAttendance = async () => {
    const attendanceNICs = staffAttendance.map((record) => record.NIC);
    const staffNotInAttendance = staffs.filter(
      (staffMember) => !attendanceNICs.includes(staffMember.NIC)
    );

    for (const staffMember of staffNotInAttendance) {
      try {
        await axios.post("/admin/create/attendance", {
          date: currentDate,
          NIC: staffMember.NIC,
          comingIn: null,
          goingOut: null,
          workedHours: null,
        });
        console.log(`Attendance created for ${staffMember.staffName}`);
      } catch (error) {
        console.error(
          `Error creating attendance for ${staffMember.staffName}:`,
          error
        );
      }
    }
  };

  useEffect(() => {
    checkAndCreateAttendance();
  }, [attendance, staffs]);

  const handleAttendance = async (NIC, type) => {
    const currentTime = new Date().toLocaleTimeString();
    try {
      const response = await axios.post("/admin/update-attendance", {
        NIC,
        type,
        time: currentTime,
      });
      setAttendance(response.data.Attendance);
    } catch (error) {
      console.error("Failed to record attendance:", error);
    }
  };

  return (
    <Layout>
      <div className="m-4">
        <div className="text-3xl font-bold text-blue-600 mb-6">
          Daily Attendance
        </div>
        <div className="m-2">
          <div className="flex items-center mb-2">
            <div className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Date:</span>{" "}
              <span className="font-semibold text-green-600">
                {formattedDate}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Time:</span>{" "}
              <span className="font-semibold text-yellow-600">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>
        {message && (
          <div className="m-2 text-xl italic text-center text-red-500">
            {message}
          </div>
        )}
        <table className="w-[90%] mx-auto mt-8 border rounded-lg shadow-lg">
          <thead className="bg-blue-200 text-left">
            <tr>
              <th className="p-4 text-center">NIC No</th>
              <th className="p-4 text-center">Staff Name</th>
              <th className="p-4 text-center">Contact No</th>
              <th className="p-4 text-center">Coming In</th>
              <th className="p-4 text-center">Going Out</th>
              <th className="p-4 text-center">Worked Hours {" (hr.)"}</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.NIC}>
                <td className="p-4 text-center">{staff.NIC}</td>
                <td className="p-4 text-center">{staff.staffName}</td>
                <td className="p-4 text-center">{staff.mobileNo}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center items-center">
                    {staffAttendance.find(
                      (staff2) => staff2.NIC === staff.NIC && staff2.comingIn
                    ) ? (
                      <MdCheckCircle className="text-green-500" />
                    ) : (
                      <MdCancel
                        className="hover:cursor-pointer text-red-500"
                        onClick={() => handleAttendance(staff.NIC, "comingIn")}
                      />
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center items-center">
                    {staffAttendance.find(
                      (staff2) => staff2.NIC === staff.NIC && staff2.goingOut
                    ) ? (
                      <MdCheckCircle className="text-green-500" />
                    ) : (
                      <MdCancel
                        className="hover:cursor-pointer text-red-500"
                        onClick={() => handleAttendance(staff.NIC, "goingOut")}
                      />
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  {staffAttendance.map(
                    (staff2) =>
                      staff2.NIC === staff.NIC && (
                        <span key={staff2.NIC}>{staff2.workedHours}</span>
                      )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Attendance;
