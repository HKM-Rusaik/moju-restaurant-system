import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios.js";
import Table from "components/admin-components/Table";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AdminReservation = () => {
  const [reservation, setReservation] = useState([]);
  const [isReservation, setIsReservation] = useState(true);
  const [isTable, setIsTable] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString(undefined, options);
  const formattedTime = today.toLocaleTimeString();

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateTimeString)
    );
  };

  useEffect(() => {
    const getAllReservations = async () => {
      const response = await axios.get("admin/customer-reservations");
      setReservation(response.data.reservations);
    };
    getAllReservations();
  }, []);

  const handleDeleteReservation = async () => {
    const response = await axios.delete(
      `admin/delete/reservation/${selectedReservationId}`
    );
    setReservation(
      reservation.filter((r) => r.reservationId !== selectedReservationId)
    );
    setShowDeleteModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const openDeleteModal = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleReservation = () => {
    setIsReservation(true);
    setIsTable(false);
  };

  const handleTables = () => {
    setIsTable(true);
    setIsReservation(false);
  };

  return (
    <Layout>
      <div className="text-2xl font-bold m-4 text-blue-600">
        Tables & Reservation
      </div>
      <div className="m-2 text-gray-700">
        <div className="flex items-center mb-2">
          <span className="mr-2">Date:</span>
          <strong>{formattedDate}</strong>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Time:</span>
          <strong>{formattedTime}</strong>
        </div>
      </div>

      <div className=" flex justify-center space-x-4">
        <div
          className={`p-2 cursor-pointer text-center  text-white font-bold rounded-md transition duration-300 ${
            isReservation ? "bg-blue-600" : "bg-blue-400"
          }`}
          onClick={handleReservation}
        >
          Reservations
        </div>
        <div
          className={`p-2 cursor-pointer text-center text-white font-bold rounded-md transition duration-300 ${
            isTable ? "bg-blue-600" : " bg-blue-400"
          }`}
          onClick={handleTables}
        >
          Dine-in Tables
        </div>
      </div>
      {isReservation && (
        <div className="overflow-x-auto">
          <div className="flex mx-auto justify-center">
            <h2 className="text-2xl text-center font-bold mt-8">
              Reservations
            </h2>
          </div>
          <table className="w-[95%] mx-auto border-collapse rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">
                  Reservation ID
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Customer Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Reserved Date
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  No of Guest
                </th>
                <th className="border border-gray-300 px-4 py-2">Note</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservation.map((record) => (
                <tr key={record.reservationId} className="hover:bg-blue-100">
                  <td className="text-center py-3">{record.reservationId}</td>
                  <td className="text-center py-3">
                    {record.customer["firstName"] +
                      " " +
                      record.customer["lastName"]}
                  </td>
                  <td className="text-center py-3">
                    {formatDateTime(record.reservationDate)}
                  </td>
                  <td className="text-center py-3">{record.noOfGuests}</td>
                  <td className="text-center py-3">{record.note}</td>
                  <td className="text-center py-3 flex justify-center">
                    <FaTrashAlt
                      onClick={() => openDeleteModal(record.reservationId)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isTable && <Table />}

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">
            Are you sure you want to delete this reservation?
          </p>
          <div className="flex justify-end">
            <button
              onClick={closeDeleteModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteReservation}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Success</h2>
          <p className="mb-4">Reservation successfully deleted!</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default AdminReservation;
  