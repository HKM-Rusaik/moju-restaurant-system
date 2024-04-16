import React from "react";
import Layout from "../../layouts/AdminLayouts";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import DailyEarning from "components/admin-components/DailyEarning";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="mt-2">
        <div className="flex justify-end items-center text-2xl pr-8">
          <span className="mr-4 font-semibold">Admin</span>
          <IoMailUnreadOutline className="mr-4" /> <FaRegUserCircle />
        </div>
        <span className="font-bold text-xl  ml-2">Management Dashboard</span>
        <DailyEarning />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
