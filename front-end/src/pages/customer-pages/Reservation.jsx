import React, { useEffect, useState } from "react";
import TableReservation from "components/customer-components/TableReservation";
import Layout from "layouts/CustomerLayout";
import { useSelector } from "react-redux";
import axios from "axios.js";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const customerId = useSelector((state) => state.customer.customer.customerId);
  console.log(customerId);
  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await axios.get(`/admin/reservations/${customerId}`);
        setReservations(response.data.reservations);
      } catch (err) {
        console.log("Error ");
      }
    };
    getReservations();
  }, []);

  console.log(reservations);

  const handleDeleteReservation = async (reservationId) => {
    try {
      const response = await axios.delete(
        `admin/delete/reservation/${reservationId}`
      );
      alert("reservation delete successfully");
    } catch (err) {
      alert("Error in dleeting reservation");
    }
  };

  return (
    <Layout>
      <div className="fade-enter-active">
        <TableReservation />
        <hr className="text-black bg-black opacity-100 border-4 mt-8" />
        <div className="">
          <div className="flex justify-center mt-8">
            <div className="flex justify-center text-center font-bold mb-4 p-2 text-black rounded w-fit bg-yellow-500">
              Reservations you made
            </div>
          </div>
          <div>
            <table className="w-[95%] mx-auto border-collapse rounded-lg shadow-lg overflow-hidden">
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">
                  Reserved date{" "}
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  no of guest
                </th>
                <th className="border border-gray-300 px-4 py-2">message</th>
                <th className="border border-gray-300 px-4 py-2">action</th>
              </tr>

              <tbody className="bg-white divide-y divide-gray-200">
                {" "}
                {reservations.map((item) => (
                  <tr key={item.reservationId} className="hover:bg-blue-100">
                    <td className="text-center py-3">
                      {(() => {
                        const date = new Date(item.reservationDate);
                        const formattedDate = date.toLocaleDateString();
                        const formattedTime = date.toLocaleTimeString();
                        return `${formattedDate} ${formattedTime}`;
                      })()}
                    </td>
                    <td className="text-center py-3">{item.noOfGuests}</td>
                    <td className="text-center py-3">{item.note}</td>
                    <td className="text-center py-3">
                      <button
                        className="bg-red-500 p-2 text-white rounded"
                        onClick={() =>
                          handleDeleteReservation(item.reservationId)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;
