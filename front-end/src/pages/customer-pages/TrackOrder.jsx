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
        <div className="mt-8 flex justify-around bg-white text-black rounded">
          <div
            className={`hover:cursor-pointer text-center hover:bg-gray-600 hover:font-bold ${
              isToReceive ? "bg-gray-600 font-bold text-white" : ""
            } w-full rounded`}
            onClick={handleToReceiveClick}
          >
            To Receive
          </div>
          <div
            className={`hover:cursor-pointer text-center hover:bg-gray-600 hover:font-bold ${
              isCompleted ? "bg-gray-600 font-bold text-white" : ""
            } w-full rounded`}
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
