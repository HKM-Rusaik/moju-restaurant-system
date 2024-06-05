import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios.js";

export default function AttendanceBarChart({ duration }) {
  const [dailyWorkedEmployees, setDailyWorkedEmployess] = useState([]);

  useEffect(() => {
    const getDailyTotal = async () => {
      const response = await axios.get(`/admin/staff/attended/${duration}`);
      setDailyWorkedEmployess(response.data);
    };
    getDailyTotal();
  }, []);

  console.log(dailyWorkedEmployees);
  let maxEmployee = 0;
  let maxDate;
  let minEmployee = Infinity;
  let minDate;

  for (const employee of dailyWorkedEmployees) {
    if (employee.totalWorkedEmployees > maxEmployee) {
      maxEmployee = employee.totalWorkedEmployees;
      maxDate = employee.orderDate;
    }
    if (employee.totalWorkedEmployees < minEmployee) {
      minEmployee = employee.totalWorkedEmployees;
      minDate = employee.orderDate;
    }
  }

  return (
    <div className="text-center">
      <div className="  mb-2 rounded-md px-2 mx-auto w-fit flex justify-center">
        <h1 className="font-bold">Daily Business Total</h1>
      </div>
      <BarChart
        width={500}
        height={300}
        data={dailyWorkedEmployees}
        margin={{
          top: 5,
          right: 30,
          left: 40,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="orderDate" />
        <YAxis
          //   tickFormatter={(tick) => Math.floor(tick)} // Format Y-axis labels to integers
          label={{
            value: "No of Employess",
            angle: -90,
            // position: "insideLeft",
            dx: -40, // Horizontal adjustment
            style: { fontWeight: "bold" },
          }}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="totalWorkedEmployees"
          name="Total Worked Employee"
          fill="#8884d8"
        />
      </BarChart>

      <div>
        Maximum Employees worked on <span className="font-bold">{maxDate}</span>{" "}
        with <span className="font-bold">{maxEmployee}</span> Employees
      </div>
      <div>
        Minimum Employees worked on{" "}
        <span className="font-bold">{minDate} </span>with{" "}
        <span className="font-bold">{minEmployee}</span> Employees
      </div>
    </div>
  );
}
