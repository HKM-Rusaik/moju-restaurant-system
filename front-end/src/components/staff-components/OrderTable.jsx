import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import ItemList from "components/customer-components/ItemList";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/staff/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log("server error", err);
      });
  }, []);

  const toggleStatus = async (orderId, statusType) => {
    try {
      await axios.put(
        `http://localhost:5000/staff/orders/${orderId}/${statusType}`
      );
      // Update the local state to reflect the updated status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                [`order_status.${statusType}`]:
                  !order[`order_status.${statusType}`],
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        `Error updating ${statusType} status for order ${orderId}:`,
        error
      );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full mx-auto mt-8 border-collapse rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border border-gray-800 px-4 py-2">Order ID</th>
            <th className="border border-gray-800 px-4 py-2">Customer Name</th>
            <th className="border border-gray-800 px-4 py-2">Order Details</th>
            <th className="border border-gray-800 px-4 py-2">Payment Method</th>
            <th className="border border-gray-800 px-4 py-2">Order Type</th>
            <th className="border border-gray-800 px-4 py-2">
              Delivery Address
            </th>
            <th className="border border-gray-800 px-4 py-2">Prepared</th>
            <th className="border border-gray-800 px-4 py-2">Picked</th>
            <th className="border border-gray-800 px-4 py-2">Delivered</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-800">
          {orders.map((order) => (
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
              <td className="text-center py-3">{order.deliveryAddress}</td>
              <td className="text-center py-3">
                <button
                  className={`${
                    order["order_status.prepared"]
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white px-2 py-1 rounded`}
                  onClick={() => toggleStatus(order.orderId, "prepared")}
                >
                  {order["order_status.prepared"] ? (
                    <MdCheckCircle />
                  ) : (
                    <MdCancel />
                  )}
                </button>
              </td>
              <td className="text-center py-3">
                <button
                  className={`${
                    order["order_status.picked"] ? "bg-green-500" : "bg-red-500"
                  } text-white px-2 py-1 rounded`}
                  onClick={() => toggleStatus(order.orderId, "picked")}
                >
                  {order["order_status.picked"] ? (
                    <MdCheckCircle />
                  ) : (
                    <MdCancel />
                  )}
                </button>
              </td>
              <td className="text-center py-3">
                <button
                  className={`${
                    order["order_status.delivered"]
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white px-2 py-1 rounded`}
                  onClick={() => toggleStatus(order.orderId, "delivered")}
                >
                  {order["order_status.delivered"] ? (
                    <MdCheckCircle />
                  ) : (
                    <MdCancel />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
