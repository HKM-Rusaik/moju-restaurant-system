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

export default function OrderTypePieChart() {
  const [ordersByType, setOrdersByType] = useState([]);

  useEffect(() => {
    const getOrdersByType = async () => {
      const response = await axios.get("/admin/order-counts-by-type");
      setOrdersByType(response.data);
    };

    getOrdersByType();
  }, []);

  console.log(ordersByType);
  return (
    <div className="text-center">
      <div className="bg-black  mb-2 rounded-md px-2 mx-auto w-fit flex justify-center">
        <h1 className=" text-yellow-500">Orders Made in Each Category</h1>
      </div>

      <PieChart width={400} height={300}>
        <Pie
          data={ordersByType}
          cx="50%"
          cy="40%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {ordersByType.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          payload={ordersByType.map((entry, index) => ({
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
  );
}
