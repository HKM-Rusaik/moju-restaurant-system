import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios.js";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function StaffPieChart({ duration }) {
  const [staffsByType, setStaffsByType] = useState([]);

  useEffect(() => {
    const getCountsByRole = async () => {
      const response = await axios.get(
        `/admin/staff/counts-by-role/${duration}`
      );
      setStaffsByType(response.data);
    };

    getCountsByRole();
  }, []);

  console.log(staffsByType);

  const totalEmployees = staffsByType.reduce(
    (acc, staff) => acc + staff.value,
    0
  );

  console.log(totalEmployees);

  return (
    <div className="">
      <div className="mb-2 font-bold rounded-md px-2 mx-auto flex justify-start">
        No of Staffs with roles
      </div>

      <div className="flex items-center justify-start">
        <div>
          <PieChart width={200} height={300}>
            <Pie
              data={staffsByType}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {staffsByType.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              payload={staffsByType.map((entry, index) => ({
                id: entry.name,
                type: "square",
                value: entry.name,
                color: COLORS[index % COLORS.length],
              }))}
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
            />
          </PieChart>
        </div>

        <div>
          <span className="block">
            No of Employees works : {totalEmployees}
          </span>
          {staffsByType.map((staff) => (
            <span key={staff.name} className="block">
              <span className="font-bold">{staff.name}</span> : {staff.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
