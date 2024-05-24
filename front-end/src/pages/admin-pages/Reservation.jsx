import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios.js";

const AdminReservation = () => {
  const [reservation, setReservation] = useState([]);
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
  return (
    <Layout>
      <div className="text-2xl font-bold m-4">Table Reservation</div>
      <div className="m-2">
        <div>Date: {formattedDate}</div>
        <div>Day: {formattedTime}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-[95%] mx-auto mt-8 border-collapse rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-800 px-4 py-2">
                Reservation ID
              </th>
              <th className="border border-gray-800 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-gray-800 px-4 py-2">
                Reserved Date
              </th>
              <th className="border border-gray-800 px-4 py-2">No of Guest</th>
              <th className="border border-gray-800 px-4 py-2">Note</th>
              <th className="border border-gray-800 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservation.map((record) => (
              <tr key={record.reservationId} className="hover:bg-gray-500">
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
                <td className="text-center py-3">
                  <FaTrashAlt className="text-red-500 text-center" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminReservation;
