import React from "react";
import Layout from "../../layouts/AdminLayouts";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios.js";
import { useState } from "react";
import Mychart from "components/admin-components/OrderBarChart";
import OrderTypePieChart from "components/admin-components/OrderTypePieChart";
import { type } from "@testing-library/user-event/dist/type";

const AdminDashboard = () => {
  const [totalEarning, setTotalEarning] = useState(0);
  const [attendance, setAttendance] = useState([]);
  const [orders, setOrders] = useState([]);
  const [amountWithPayment, setAmountWithPayment] = useState([]);

  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      const response = await axios.get("admin/orders/today-earnings");
      setTotalEarning(response.data.totalEarnings);
    };

    const getAttendance = async () => {
      const response = await axios.get("admin/attendance");
      setAttendance(response.data);
    };

    const getOrders = async () => {
      const response = await axios.get("staff/orders");
      setOrders(response.data);
    };
    const getTotalAmountsByPaymentType = async () => {
      const response = await axios.get(
        "admin/orders/businessAmount-by-payment-type"
      );
      setAmountWithPayment(response.data);
    };
    fetchTotalEarnings();
    getAttendance();
    getOrders();
    getTotalAmountsByPaymentType();
  }, []);

  console.log(amountWithPayment);
  const codAmount = amountWithPayment
    .filter((item) => item.paymentMethod === "cod")
    .map((item) => item.totalAmount)[0];

  const cardAmount = amountWithPayment
    .filter((item) => item.paymentMethod === "card")
    .map((item) => item.totalAmount)[0];

  const countTodayAttendance = attendance.filter(
    (record) => record.comingIn != null
  ).length;

  const countTodayOrders = orders.filter((record) => {
    const orderDate = new Date(record.orderDate).toISOString().split("T")[0];
    return orderDate === todayDate;
  }).length;

  return (
    <Layout>
      <div className="m-4">
        <div>
          <div className="flex justify-end items-center text-2xl pr-8">
            <span className="mr-4 font-semibold">Admin</span>
            <IoMailUnreadOutline className="mr-4" /> <FaRegUserCircle />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-black mb-6">
              Management Dashboard
            </div>{" "}
            <div>
              <a href="/" target="_blank">
                <div className="bg-green-500 rounded-lg p-2 hover:bg-green-700 active:bg-green-300 text-white">
                  Login as Customer
                </div>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 ">
            <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex flex-col items-center justify-center pb-8 text-white rounded">
              <div className="mb-2 font-bold text-xl text-green-300">
                Rs. {totalEarning ? totalEarning : 0}
              </div>
              <div>Today Earnings </div>
            </div>
            <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex flex-col items-center justify-center  pb-8 text-white rounded">
              <div className="font-bold text-xl text-green-300">
                {countTodayAttendance}
              </div>{" "}
              <div className="">Today Attandances</div>
            </div>
            <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex flex-col justify-center items-center pb-8 text-white rounded">
              <div className="font-bold text-xl text-green-300">
                {countTodayOrders}
              </div>{" "}
              <div>Today Orders</div>
            </div>
            <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex justify-center items-center pb-8 text-white rounded">
              Orders Completed
            </div>
            <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex flex-col items-center justify-center pb-8 text-white rounded">
              <div className="mb-2 font-bold text-xl text-green-300">
                Rs. {cardAmount}
              </div>
              <div>Total card amount </div>
            </div>
            <div className=" ml-2 mt-4 bg-gray-500 w-[200px] h-[200px] flex flex-col items-center justify-center pb-8 text-white rounded">
              <div className="mb-2 font-bold text-xl text-green-300">
                Rs. {codAmount}
              </div>
              <div>Total COD amount </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <Mychart />
            <div className="">
              <OrderTypePieChart />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
