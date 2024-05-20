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
      <table className="w-full table-auto border-collapse rounded border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
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
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td className="border border-gray-800 px-4 py-2 text-center">
                {order.orderId}
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">
                {order["customer.firstName"]} {order["customer.lastName"]}
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">
                <ItemList orderId={order.orderId} />
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">
                {order.paymentMethod.toUpperCase()}
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">
                {order.orderType}
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">
                {order.deliveryAddress}
              </td>
              <td className="border border-gray-800 px-4 py-2 text-center">
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
              <td className="border border-gray-800 px-4 py-2 text-center">
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
              <td className="border border-gray-800 px-4 py-2 text-center">
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
