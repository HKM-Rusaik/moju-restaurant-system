import React, { useEffect, useState } from "react";
import axios from "axios.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addOrders } from "slices/ordersSlice";
import ItemList from "./ItemList";
import Order from "./Order";

const OrderItem = (props) => {
  const [orders, setOrders] = useState([]);
  const customerId = useSelector((state) => state.customer.customer.customerId);
  const [membership, setMembership] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/customer/orders/${customerId}`)
      .then((response) => {
        const ordersData = response.data.orders;
        setOrders(ordersData);
        console.log(orders);
        dispatch(addOrders(ordersData));
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  const orderTotal = orders.reduce((accumulator, currenValue) => {
    return accumulator + currenValue.orderTotal;
  }, 0);

  console.log(orderTotal);

  useEffect(() => {
    // Calculate membership based on orderTotal
    let calculatedMembership = null;
    if (orderTotal >= 75000) {
      calculatedMembership = "platinum";
    } else if (orderTotal >= 50000) {
      calculatedMembership = "golden";
    } else if (orderTotal >= 30000) {
      calculatedMembership = "silver";
    } else {
      calculatedMembership = "new";
    }

    // Update membership state only if it has changed
    if (membership !== calculatedMembership) {
      setMembership(calculatedMembership);
    }
  }, [orderTotal]);

  useEffect(() => {
    // Update membership in the backend whenever it changes
    const updateMembership = async () => {
      try {
        await axios.put(`/customer/update-membership/${customerId}`, {
          membership,
        });
        console.log("Membership updated successfully");
      } catch (err) {
        console.log("Error in updating membership:", err);
      }
    };

    // Call updateMembership function whenever membership changes
    if (membership) {
      updateMembership();
    }
  }, [membership, customerId]);

  useEffect(() => {
    const updateOrderStatus = async (orderId) => {
      try {
        const response = await axios.get(
          `/customer/order-order-status/${orderId}`
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
        }

        console.log("Before putting. Order ID:", orderId);
        await axios.put(`/customer/order/${orderId}`, {
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

  // Sort both arrays in descending order based on orderId
  finishedOrders.sort((a, b) => b.orderId - a.orderId);
  pendingOrders.sort((a, b) => b.orderId - a.orderId);

  return (
    <div className="mt-8 table-auto border-collapse w-[80%] mx-auto">
      {props.isReceived
        ? pendingOrders.map((order) => (
            <Order
              key={order.orderId}
              orderId={order.orderId}
              orderTotal={order.orderTotal}
              orderStatus={order.orderStatus}
              billUrl={order.billUrl}
            />
          ))
        : finishedOrders.map((order) => (
            <Order
              key={order.orderId}
              orderId={order.orderId}
              orderTotal={order.orderTotal}
              orderStatus={order.orderStatus}
            />
          ))}
    </div>
  );
};

export default OrderItem;
