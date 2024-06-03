import React, { useState } from "react";
import OrderItem from "components/customer-components/OrderItem";
import Layout from "layouts/CustomerLayout";

const TrackOrder = () => {
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
    <Layout>
      <div className="fade-enter-active ">
        <p className="text-center font-bold text-2xl mt-8">My Orders</p>
        <div className="mt-4 flex justify-center space-x-4">
          <div
            className={`p-2 cursor-pointer text-center  text-white font-bold rounded-md transition duration-300 ${
              isToReceive ? "bg-blue-600" : "bg-blue-400"
            }`}
            onClick={handleToReceiveClick}
          >
            To Receive
          </div>
          <div
            className={`p-2 cursor-pointer text-center  text-white font-bold rounded-md transition duration-300 ${
              isCompleted ? "bg-blue-600" : "bg-blue-400"
            }`}
            onClick={handleCompletedClick}
          >
            Completed
          </div>
        </div>
        <OrderItem isReceived={isToReceive} />
      </div>
    </Layout>
  );
};

export default TrackOrder;
