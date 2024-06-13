import React from "react";
import Header from "components/staff-components/Header";
import OrdersTable from "components/staff-components/OrderTable";
import DeliveredOrders from "components/staff-components/DeliveredOrders";
import { useState } from "react";
import PreparedOrders from "components/staff-components/PreparedOrders";

const Home = () => {
  const [isToReceive, setIsToReceive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [isDineInPrepared, setIsDineInPrepared] = useState(false);
  const [isDeliveryPrepared, setIsDeliveryPrepared] = useState(false);
  const [isTakeawayePrepared, setIsTakeawayPrepared] = useState(false);

  const handleToReceiveClick = () => {
    setIsDineInPrepared(false);
    setIsToReceive(true);
    setIsDeliveryPrepared(false);
    setIsTakeawayPrepared(false);
    setIsCompleted(false);
  };

  const handleCompletedClick = () => {
    setIsDineInPrepared(false);
    setIsToReceive(false);
    setIsDeliveryPrepared(false);
    setIsTakeawayPrepared(false);
    setIsCompleted(true);
  };

  const handleDineInPrepared = () => {
    setIsDineInPrepared(true);
    setIsToReceive(false);
    setIsDeliveryPrepared(false);
    setIsTakeawayPrepared(false);
    setIsCompleted(false);
  };
  const handleDeliveryPrepared = () => {
    setIsDineInPrepared(false);
    setIsToReceive(false);
    setIsDeliveryPrepared(true);
    setIsTakeawayPrepared(false);
    setIsCompleted(false);
  };
  const handleTakeawayPrepared = () => {
    setIsDineInPrepared(false);
    setIsToReceive(false);
    setIsDeliveryPrepared(false);
    setIsTakeawayPrepared(true);
    setIsCompleted(false);
  };
  return (
    <div className="">
      <Header />
      <div className="m-[2%]">
        <div className="fade-enter-active ">
          <p className="text-center font-bold text-3xl mt-8 text-gray-800">
            Orders
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div
              className={`p-4 cursor-pointer text-center rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                isToReceive
                  ? "bg-gray-600 text-white scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              } w-full max-w-xs`}
              onClick={handleToReceiveClick}
            >
              Pending Orders
            </div>
            <div
              className={`p-4 cursor-pointer text-center rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                isDineInPrepared
                  ? "bg-gray-600 text-white scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              } w-full max-w-xs`}
              onClick={handleDineInPrepared}
            >
              Prepared Dine-in Orders
            </div>
            <div
              className={`p-4 cursor-pointer text-center rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                isDeliveryPrepared
                  ? "bg-gray-600 text-white scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              } w-full max-w-xs`}
              onClick={handleDeliveryPrepared}
            >
              Prepared Delivery Orders
            </div>
            <div
              className={`p-4 cursor-pointer text-center rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                isTakeawayePrepared
                  ? "bg-gray-600 text-white scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              } w-full max-w-xs`}
              onClick={handleTakeawayPrepared}
            >
              Prepared takeaway Orders
            </div>
            <div
              className={`p-4 cursor-pointer text-center rounded-lg shadow-md transition duration-300 ease-in-out transform ${
                isCompleted
                  ? "bg-gray-600 text-white scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-200"
              } w-full max-w-xs`}
              onClick={handleCompletedClick}
            >
              Finished Orders
            </div>
          </div>
        </div>
        <div className="mt-8">
          {isToReceive && <OrdersTable />}
          {isCompleted && <DeliveredOrders />}
          {isDeliveryPrepared && <PreparedOrders type="delivery" />}
          {isDineInPrepared && <PreparedOrders type="dine-in" />}
          {isTakeawayePrepared && <PreparedOrders type="takeaway" />}
        </div>
      </div>
    </div>
  );
};

export default Home;
