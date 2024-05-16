import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addOrders } from "slices/ordersSlice";
import ItemList from "./ItemList";

const OrderItem = (props) => {
  const [orders, setOrders] = useState([]);
  const customerId = useSelector((state) => state.customer.customer.customerId);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/customer/orders/${customerId}`)
      .then((response) => {
        const ordersData = response.data.orders;
        setOrders(ordersData);
        dispatch(addOrders(ordersData)); // Dispatch addOrders after setting ordersData
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  useEffect(() => {
    const updateOrderStatus = async (orderId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/customer/order-order-status/${orderId}`
        );

        // Debugging: Log response data
        console.log(orderId);
        console.log(response);

        let orderStatus = "processing";
        if (response.data.order.prepared) {
          if (response.data.order.picked) {
            if (response.data.order.delivered) {
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

  let finishedOrders = [];
  let pendingOrders = [];
  orders.forEach((order) => {
    if (order.orderStatus === "delivered") {
      finishedOrders.push(order);
    } else {
      pendingOrders.push(order);
    }
  });

  return (
    <table className="mt-8 table-auto border-collapse w-[80%] mx-auto">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Order ID</th>
          <th className="border border-gray-300 px-4 py-2">Item Details</th>
          <th className="border border-gray-300 px-4 py-2">Total Amount</th>
          <th className="border border-gray-300 px-4 py-2">Order Status</th>
        </tr>
      </thead>

      <tbody>
        {props.isReceived
          ? pendingOrders.map((order) => (
              <tr key={order.orderId}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order.orderId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <ItemList orderId={order.orderId} />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order.orderTotal}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order.orderStatus}
                </td>
              </tr>
            ))
          : finishedOrders.map((order) => (
              <tr key={order.orderId}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order.orderId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <ItemList orderId={order.orderId} />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order.orderTotal}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {order.orderStatus}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default OrderItem;
