import React, { useEffect, useState } from "react";
import axios from "axios.js";
import ItemList from "components/customer-components/ItemList";

const DeliveredOrders = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  useEffect(() => {
    const getDeliveredOrders = async (req, res) => {
      const response = await axios.get("staff/delivered-orders");
      setDeliveredOrders(response.data);
    };

    getDeliveredOrders();
  }, []);
  console.log(deliveredOrders);
  const filterOrders = deliveredOrders.sort((a, b) => b.orderId - a.orderId);
  return (
    <div className="overflow-x-auto">
      <table className="fade-enter-active w-full mx-auto mt-8 border-collapse rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="border border-gray-800 px-4 py-2">Order ID</th>
            <th className="border border-gray-800 px-4 py-2">Customer Name</th>
            <th className="border border-gray-800 px-4 py-2">Order Details</th>
            <th className="border border-gray-800 px-4 py-2">Payment Method</th>
            <th className="border border-gray-800 px-4 py-2">Order Type</th>
            <th className="border border-gray-800 px-4 py-2">
              Delivery Address
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-800">
          {filterOrders.map((order) => (
            <tr key={order.orderId}>
              <td className="text-center py-3">{order.orderId}</td>
              <td className="text-center py-3">
                {order["customer.firstName"]} {order["customer.lastName"]}
              </td>
              <td className="text-center py-3">
                <ItemList orderId={order.orderId} />
              </td>
              <td className="text-center py-3">
                {order.paymentMethod.toUpperCase()}
              </td>
              <td className="text-center py-3">{order.orderType}</td>
              <td className="text-center py-3">{order.deliveryAddress}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveredOrders;
