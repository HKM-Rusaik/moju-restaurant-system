import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderItem = () => {
  const [orders, setOrders] = useState([]);
  const customerId = useSelector((state) => state.customer.customer.customerId);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/orders/${customerId}`)
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  useEffect(() => {
    const updateOrderStatus = async (orderId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/customer/order/${orderId}`
        );

        // Debugging: Log response data
        console.log(orderId);

        let orderStatus = "processing";
        if (response.order.prepared) {
          if (response.order.picked) {
            if (response.order.delivered) {
              orderStatus = "delivered";
            } else {
              orderStatus = "picked";
            }
          } else {
            orderStatus = "prepared";
          }
        } else {
          orderStatus = "processing";
        }

        console.log("Before putting. Order ID:", orderId);
        await axios.put(`http://localhost:5000/customer/order/${orderId}`, {
          orderStatus: orderStatus,
        });
        console.log("After putting. Order ID:", orderId);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

    orders.forEach((order) => {
      if (order.orderId) {
        updateOrderStatus(order.orderId);
      }
    });
  }, [orders]);

  return (
    <table className="mt-8 table-auto border-collapse w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Order ID</th>
          <th className="border border-gray-300 px-4 py-2">Item Details</th>
          <th className="border border-gray-300 px-4 py-2">Total Amount</th>
          <th className="border border-gray-300 px-4 py-2">Order Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.orderId}>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {order.orderId}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              item details here
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {order.orderTotal}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {order.OrderStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderItem;
