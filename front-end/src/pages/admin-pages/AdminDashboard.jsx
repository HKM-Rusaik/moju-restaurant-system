import React from "react";
import Layout from "../../layouts/AdminLayouts";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios.js";
import { useState } from "react";

const AdminDashboard = () => {
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      const response = await axios.get("admin/orders/today-earnings");
      setTotalEarning(response.data.totalEarnings);
    };

    fetchTotalEarnings();
  }, []);
  return (
    <Layout>
      <div className="mt-2">
        <div className="flex justify-end items-center text-2xl pr-8">
          <span className="mr-4 font-semibold">Admin</span>
          <IoMailUnreadOutline className="mr-4" /> <FaRegUserCircle />
        </div>
        <span className="font-bold text-xl  ml-2">Management Dashboard</span>
        <div className="">
          <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex flex-col items-center justify-center pb-8 text-white rounded">
            <div className="mb-2">{totalEarning ? totalEarning : 0}</div>
            <div>Today Earnings </div>
          </div>
          <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex justify-center items-end pb-8 text-white rounded">
            Employee Attendance
          </div>
          <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex justify-center items-end pb-8 text-white rounded">
            Today Orders
          </div>
          <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex justify-center items-end pb-8 text-white rounded">
            Orders Completed
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
