import React from "react";
import Layout from "layouts/AdminLayouts";

const Attendence = () => {
  return (
    <Layout>
      <div className="font-bold text-2xl m-2">Attendance</div>
      <div className="m-2">
        <div>Date</div>
        <div>Day</div>
      </div>

      <table className="w-[90%] mx-auto mt-8 border rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-4">NIC No</th>
            <th className="p-4">Staff Name</th>
            <th className="p-4">Coming In</th>
            <th className="p-4">Going Out</th>
            <th className="p-4">Worked Hours</th>
          </tr>
        </thead>
      </table>
    </Layout>
  );
};

export default Attendence;
