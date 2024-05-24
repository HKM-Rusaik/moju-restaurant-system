import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import axios from "axios.js";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const Attendance = () => {
  const [staffs, setStaffs] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [staffAttendance, setStaffAttendance] = useState([]);

  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const formattedTime = today.toLocaleTimeString();

  useEffect(() => {
    const getStaffs = async () => {
      const response = await axios.get("/admin/staffs");
      setStaffs(response.data);
    };

    const getAttendance = async () => {
      const response = await axios.get("/admin/attendance");
      setStaffAttendance(response.data);
    };

    getStaffs();
    getAttendance();
  }, [attendance]);

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
      <div className="font-bold text-2xl m-2">Daily Attendance</div>
      <div className="m-2">
        <div>Date: {formattedDate}</div>
        <div>Day: {formattedTime}</div>
      </div>

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
                      <span>{staff2.workedHours}</span>
                    )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Attendance;
