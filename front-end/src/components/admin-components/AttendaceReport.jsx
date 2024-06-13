import React from "react";
import StaffPieChart from "./StaffPieChart";
import AttendanceBarChart from "./AttendanceBarChart";
import { toPascalCase } from "utils";

const AttendaceReport = ({ duration }) => {
  const formattedDuration = toPascalCase(duration);
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <div className="font-bold text-center text-2xl mb-6">
        {formattedDuration} Attendance Report
      </div>
      <StaffPieChart />
      <hr class="mt-4 text-black hr-bold" />
      <AttendanceBarChart duration={duration} />
    </div>
  );
};

export default AttendaceReport;
