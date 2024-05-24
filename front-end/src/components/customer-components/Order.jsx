import React from "react";
import ItemList from "./ItemList";
import { FaLink } from "react-icons/fa6";

const Order = (props) => {
  return (
    <div className="w-full bg-white p-2 flex items-center justify-between rounded-lg shadow-lg mb-2">
      <div>
        <div className="font-bold mb-2 text-xl">Order Id: {props.orderId}</div>
        <ItemList orderId={props.orderId} />
        <div className="font-bold">Total amount : {props.orderTotal}</div>
      </div>
      <div className="bg-gray-200 rounded p-1">
        Status :{" "}
        <span className="font-bold text-green-700">{props.orderStatus}</span>
        <span className="">
          <a href={props.billUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center text-blue-500 hover:text-white">
              Bill <FaLink />
            </div>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Order;
