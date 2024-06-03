import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import axios from "axios.js";
import DateTimeDisplay from "components/admin-components/DateTime";

const CustomerRelations = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [supports, setSupports] = useState([]);
  const [isFeedback, setIsFeedback] = useState(true);
  const [isSupport, setIsSupport] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [notification, setNotification] = useState("");

  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [selectedSupportId, setSelectedSupportId] = useState(null);

  useEffect(() => {
    const getFeedbacks = async () => {
      const response = await axios.get("/admin/customer/feedbacks");
      setFeedbacks(response.data);
    };

    const getSupports = async () => {
      const response = await axios.get("/admin/customer/supports");
      setSupports(response.data);
    };

    getFeedbacks();
    getSupports();
  }, []);

  const handleFeedback = () => {
    setIsFeedback(true);
    setIsSupport(false);
  };

  const handleSupport = () => {
    setIsSupport(true);
    setIsFeedback(false);
  };

  const showDeleteConfirmation = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setShowConfirmationModal(true);
  };

  const showSupportDeleteConfirmation = (supportId) => {
    setSelectedSupportId(supportId);
    setShowConfirmationModal(true);
  };

  const deleteFeedback = async () => {
    try {
      await axios.delete(`/admin/customer/feedback/${selectedFeedbackId}`);
      setFeedbacks(
        feedbacks.filter(
          (feedback) => feedback.feedbackId !== selectedFeedbackId
        )
      );
      setNotification("Feedback successfully deleted");
      setTimeout(() => setNotification(""), 2000);
    } catch (err) {
      console.error("Error deleting feedback", err);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const deleteSupport = async () => {
    try {
      await axios.delete(`/admin/customer/support/${selectedSupportId}`);
      setSupports(
        supports.filter((support) => support.supportId !== selectedSupportId)
      );
      setNotification("Support message successfully deleted");
      setTimeout(() => setNotification(""), 2000);
    } catch (err) {
      console.error("Error deleting support", err);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <Layout>
      <div className="m-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Customer Services
        </h1>
        <DateTimeDisplay />
        <div className="flex justify-center space-x-4 mb-8">
          <div
            className={`p-4 cursor-pointer text-center text-white font-semibold rounded-md transition duration-300 ${
              isFeedback ? "bg-blue-600" : "bg-blue-400"
            }`}
            onClick={handleFeedback}
          >
            Feedbacks
          </div>
          <div
            className={`p-4 cursor-pointer text-center text-white font-semibold rounded-md transition duration-300 ${
              isSupport ? "bg-blue-600" : "bg-blue-400"
            }`}
            onClick={handleSupport}
          >
            Supports
          </div>
        </div>
        {isFeedback && (
          <div className="overflow-x-auto">
            <div className="text-center mb-4 text-xl font-bold">
              Customer Feedbacks
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {/* Table Header */}
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Feedback ID
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Customer ID
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Order ID
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Feedback
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr
                    key={feedback.feedbackId}
                    className="border-t border-gray-300 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-gray-800">
                      {feedback.feedbackId}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {feedback.customerId}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {feedback.orderId}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {feedback.feedback}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      <button
                        onClick={() =>
                          showDeleteConfirmation(feedback.feedbackId)
                        }
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isSupport && (
          <div className="overflow-x-auto mt-8">
            <div className="text-center mb-4 text-xl font-bold">
              Support Details
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {/* Table Header */}
              <thead className="bg-green-500 text-white rounded-xl">
                <tr>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Support ID
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Customer Name
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Customer Email
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Message
                  </th>
                  <th className="py-3 px-6 text-left text-lg font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {supports.map((support) => (
                  <tr
                    key={support.supportId}
                    className="border-t border-gray-300 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-gray-800">
                      {support.supportId}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {support.customerName}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {support.customerEmail}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {support.message}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      <button
                        onClick={() =>
                          showSupportDeleteConfirmation(support.supportId)
                        }
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showConfirmationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Confirm Deletion
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={isFeedback ? deleteFeedback : deleteSupport}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {notification && (
        <div className="fixed z-50 bottom-10 right-10 bg-green-400 px-4 py-2 rounded-lg shadow-md">
          {notification}
        </div>
      )}
    </Layout>
  );
};

export default CustomerRelations;
