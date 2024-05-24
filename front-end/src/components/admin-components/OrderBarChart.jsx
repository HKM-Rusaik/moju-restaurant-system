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

export default function OrderBarChart() {
  const [dailyTotals, setDailyTotals] = useState([]);

  useEffect(() => {
    const getDailyTotal = async () => {
      const response = await axios.get("/admin/daily-total-orders");
      setDailyTotals(response.data);
    };
    getDailyTotal();
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={dailyTotals}
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
        label={{
          value: "Daily Earning Amount",
          angle: -90,
          // position: "insideLeft",
          dx: -40, // Horizontal adjustment
          style: { fontWeight: "bold" },
        }}
      />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="totalOrderAmount"
        name="Total Order Amount"
        fill="#8884d8"
      />
    </BarChart>
  );
}
