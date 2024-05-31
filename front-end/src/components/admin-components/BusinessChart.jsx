import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  Cell,
  PieChart,
} from "recharts";
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

export const BusinessBarChart = ({ duration }) => {
  const [dailyTotals, setDailyTotals] = useState([]);

  useEffect(() => {
    const getDailyTotal = async () => {
      const response = await axios.get(`/admin/total-orders/${duration}`);
      setDailyTotals(response.data);
    };
    getDailyTotal();
  }, []);

  return (
    <div>
      <div id="business-bar-chart">
        <BarChart
          width={500}
          height={300}
          data={dailyTotals}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="orderDate" />
          <YAxis
            label={{
              value: "Daily Earning Amount",
              angle: -90,
              dx: -40,
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
      </div>
    </div>
  );
};

export function OrderTypePieChart({ duration }) {
  const [ordersByType, setOrdersByType] = useState([]);

  useEffect(() => {
    const getOrdersByType = async () => {
      const response = await axios.get(
        `/admin/order-count-by-type/${duration}`
      );
      setOrdersByType(response.data);
    };

    getOrdersByType();
  }, [duration]);

  const orderCountsArray = Object.keys(ordersByType).map((orderType) => ({
    name: orderType,
    value: ordersByType[orderType],
  }));

  return (
    <div className="text-center">
      <PieChart width={400} height={300}>
        <Pie
          data={orderCountsArray}
          cx="50%"
          cy="40%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {orderCountsArray.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          payload={orderCountsArray.map((entry, index) => ({
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
