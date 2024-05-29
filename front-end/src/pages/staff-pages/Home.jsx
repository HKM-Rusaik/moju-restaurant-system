import React from "react";
import Header from "components/staff-components/Header";
import OrdersTable from "components/staff-components/OrderTable";
import DeliveredOrders from "components/staff-components/DeliveredOrders";
import { useState } from "react";

const Home = () => {
  const [isToReceive, setIsToReceive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);

  const handleToReceiveClick = () => {
    setIsToReceive(true);
    setIsCompleted(false); // Reset isCompleted to false when To Receive is clicked
  };

  const handleCompletedClick = () => {
    setIsToReceive(false); // Reset isToReceive to false when Completed is clicked
    setIsCompleted(true);
  };
  return (
    <div className="">
      <Header />
      <div className="m-[2%]">
        <div className="fade-enter-active ">
          <p className="text-center font-bold text-2xl mt-8">Orders</p>
          <div className="mt-8 flex items-center justify-around bg-white text-black rounded">
            <div
              className={`p-2 hover:cursor-pointer text-center hover:bg-gray-600 hover:font-bold ${
                isToReceive ? "bg-gray-600 font-bold text-white" : ""
              } w-full rounded`}
              onClick={handleToReceiveClick}
            >
              Pending Orders
            </div>
            <div
              className={`p-2 hover:cursor-pointer text-center hover:bg-gray-600 hover:font-bold ${
                isCompleted ? "bg-gray-600 font-bold text-white" : ""
              } w-full rounded`}
              onClick={handleCompletedClick}
            >
              Finished Orders
            </div>
          </div>
        </div>
        {isToReceive ? <OrdersTable /> : <DeliveredOrders />}
      </div>
    </div>
  );
};

export default Home;
