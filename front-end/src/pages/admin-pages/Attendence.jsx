import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import axios from "axios.js";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const Attendence = () => {
  const [staffs, setStaffs] = useState([]);
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

    getStaffs();
  }, []);
  return (
    <Layout>
      <div className="font-bold text-2xl m-2">Attendance</div>
      <div className="m-2">
        <div>Date: {formattedDate}</div>
        <div>Day: {formattedTime}</div>
      </div>

      <table className="w-[90%] mx-auto mt-8 border rounded-lg shadow-lg">
        <thead className="bg-blue-200 text-left">
          <tr>
            <th className="p-4 text-center">NIC No</th>
            <th className="p-4 text-center">Staff Name</th>
            <th className="p-4 text-center">Coming In</th>
            <th className="p-4 text-center">Going Out</th>
            <th className="p-4 text-center">Worked Hours</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff) => (
            <tr key={staff.NIC}>
              <td className="p-4 text-center">{staff.NIC}</td>
              <td className="p-4 text-center">{staff.staffName}</td>
              <td className="p-4 text-center">
                <div className="flex justify-center items-center">
                  <MdCancel />
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="flex justify-center items-center">
                  <MdCheckCircle />
                </div>
              </td>
              <td className="p-4 text-center">working hours</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Attendence;
