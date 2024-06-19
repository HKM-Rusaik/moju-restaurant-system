import React, { useState } from "react";
import ItemList from "./ItemList";
import { FaLink } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import axios from "axios.js";
import { useSelector } from "react-redux";

const Order = (props) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [showCancelOrderForm, setShowCancelOrderForm] = useState(false);
  const customerId = useSelector((state) => state.customer.customer.customerId);

  const handleFeedbackClick = () => {
    setIsFeedbackOpen(true);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = () => {
    // Handle feedback submission logic here
    try {
      const response = axios.post(`/customer/feedback/${props.orderId}`, {
        customerId,
        orderId: props.orderId,
        feedback: feedback,
      });
    } catch (err) {}
    console.log("Error is submitting feedback", feedback);
    setFeedback("");
    setIsFeedbackOpen(false);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
  };
  const isWithin5Minutes = () => {
    const orderDate = new Date(props.orderDate);
    const now = new Date();
    const differenceInMinutes = (now - orderDate) / (1000 * 60);
    return differenceInMinutes <= 5 && differenceInMinutes >= 0;
  };

  const handleCancelOrder = (orderId) => {
    setCancelOrderId(orderId);
    setShowCancelOrderForm(true);
  };

  const confirmCancelOrder = async () => {
    try {
      await axios.delete(`/customer/order/cancel/${cancelOrderId}`);
      console.log(`Order ${cancelOrderId} cancelled successfully`);
      setShowCancelOrderForm(false);
      setCancelOrderId(null);
    } catch (err) {
      console.log("Error cancelling order", err);
      setShowCancelOrderForm(false);
    }
  };

  const closeCancelOrderForm = () => {
    setShowCancelOrderForm(false);
    setCancelOrderId(null);
  };

  return (
    <div className="w-full bg-white p-2 flex items-center justify-between rounded-lg shadow-lg mb-2">
      <div>
        <div className="font-bold mb-2 text-xl">Order Id: {props.orderId}</div>
        <ItemList orderId={props.orderId} />
        <div className="font-bold">Total amount : {props.orderTotal}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 w-[220px] rounded p-1">
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
        <div
          className="mt-2 flex items-center hover:text-blue-700 active:text-blue-800 cursor-pointer"
          onClick={handleFeedbackClick}
        >
          <FcFeedback className="mr-2" />
          Give Feedback
        </div>
        {isWithin5Minutes() && (
          <div
            className="mt-2 flex items-center text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => handleCancelOrder(props.orderId)}
          >
            Cancel order within 5minutes
          </div>
        )}
      </div>
      {showCancelOrderForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this order?</p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeCancelOrderForm}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmCancelOrder}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isFeedbackOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">
              Give Feedback for OrderId: {props.orderId}
            </h2>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCloseFeedback}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFeedbackSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
