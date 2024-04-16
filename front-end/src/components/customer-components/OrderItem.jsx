import React from "react";
import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const OrderItem = (props) => {
  const [orderData, setOrderData] = useState({
    picked: false,
    readyToDeliver: false,
    delivered: false,
  });

  const picked = orderData.picked ? "Picked" : "Not Picked";
  const deliverReady = orderData.readyToDeliver
    ? "Ready To Deliver"
    : "Preparing";

  const delivery = orderData.delivered ? "Delivered" : "Not Delivered";

  return (
    <div className="ml-20">
      <p className="text-center font-bold text-2xl mt-4 mb-4">Track Order</p>
      <div className="bg-white p-2 rounded mr-20">
        <div className="flex justify-around items-center">
          <p className="">OrderItem ID: {props.id}</p>
          <div className="flex flex-col items-center">
            <IoIosCheckmarkCircleOutline />
            <p className="text-center">{picked}</p>
          </div>
          <div className="flex flex-col items-center">
            <IoIosCheckmarkCircleOutline />
            <p className="text-center">{deliverReady}</p>
          </div>
          <div className="flex flex-col items-center">
            <IoIosCheckmarkCircleOutline />
            <p className="text-center">{delivery}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
