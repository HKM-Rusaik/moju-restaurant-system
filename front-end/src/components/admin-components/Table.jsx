import React, { useState, useEffect } from "react";
import axios from "axios.js";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

const CreateTableForm = ({ onCreate }) => {
  const [tableName, setTableName] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/table", {
        tableName,
        noOfGuests,
      });
      onCreate(response.data);
      setTableName("");
      setNoOfGuests("");
    } catch (error) {
      console.error("Error creating table:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center">
      <div className="mb-4">
        <label htmlFor="tableName" className="block font-semibold">
          Table Name:
        </label>
        <input
          type="text"
          id="tableName"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="noOfGuests" className="block font-semibold">
          No. of Guests:
        </label>
        <input
          type="number"
          id="noOfGuests"
          value={noOfGuests}
          onChange={(e) => setNoOfGuests(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Table
        </button>
      </div>
    </form>
  );
};

const Table = () => {
  const [tables, setTables] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isTable, setIsTable] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [showOrderIdModal, setShowOrderIdModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("/admin/all-tables");
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);
  console.log(tables);

  const handleCreate = (newTable) => {
    setTables([...tables, newTable]);
    setShowCreateForm(false);
    setIsTable(true);
    setSuccessMessage("Table created successfully!");
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const handleDeleteTable = async (tableId) => {
    try {
      await axios.delete(`/admin/table/${tableId}`);
      setTables(tables.filter((table) => table.tableId !== tableId));
      setSuccessMessage("Table deleted successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const handleReserveTable = (tableName) => {
    setUpdateTable(tableName);
    setShowOrderIdModal(true);
  };

  const handleReserveTableWithOrderId = async () => {
    try {
      const response = await axios.put(`/admin/tables/update/${updateTable}`, {
        orderId,
      });
      setShowOrderIdModal(false);
      setSelectedTable(null);
      setOrderId("");
      alert(
        `Table ${updateTable} reserved successfully for order Id: ${orderId}`
      );
    } catch (err) {
      console.log("Error in updating reservation!", err);

      let errorMessage = "An unknown error occurred";
      if (err.response) {
        errorMessage = err.response.data.error;
      } else if (err.request) {
        errorMessage = "No response received from the server";
      } else {
        errorMessage = err.message;
      }

      alert(`Error in updating reservation: ${errorMessage}`);
      setShowOrderIdModal(false);
    }
  };

  const handleReserve = (tableName) => {
    setSelectedTable(tableName);
  };

  const handleReserveTableFuture = async () => {
    await axios.put(`/admin/table/update-reserve-time/${selectedTable}`, {
      selectedDate,
    });
    setSelectedTable(null);
    setSelectedDate(null);
    setSuccessMessage(`Table ${selectedTable} reserved successfully!`);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const deleteReservation = async (tableName) => {
    try {
      await axios.put(`/admin/table/clear-reservation/${tableName}`);
    } catch (err) {
      console.log("error in deleting reservation");
    }
  };

  const handleDeleteReservedTableNow = async (tableName) => {
    try {
      const response = await axios.put(`/admin/table/clear-table/${tableName}`);
    } catch (err) {
      console.log("Error in deleting the table ordertime");
    }
  };

  return (
    <div>
      <div className="flex justify-end mr-16">
        <button
          onClick={() => {
            setShowCreateForm(true);
            setIsTable(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create Table
        </button>
      </div>
      {showCreateForm && <CreateTableForm onCreate={handleCreate} />}
      {isTable && (
        <div className="overflow-x-auto w-full">
          <div className="flex mx-auto justify-center">
            <h2 className="text-2xl text-center font-bold">Tables</h2>
          </div>
          <table className="w-[80%] mt-8 mx-auto border-collapse rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-800 px-4 py-2">Table Name</th>
                <th className="border border-gray-800 px-4 py-2">
                  Table Capacity
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  current status
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Reserved date
                </th>
                <th className="border border-gray-800 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tables.map((table) => (
                <tr key={table.tableId}>
                  <td className="text-center border border-gray-800 px-4 py-2">
                    {table.tableName}
                  </td>
                  <td className="text-center border border-gray-800 px-4 py-2">
                    {table.noOfGuests}
                  </td>
                  <td className="text-center border border-gray-800 px-4 py-2">
                    {table.orderDateTime ? (
                      <div className="flex items-center justify-between">
                        <div>
                          {(() => {
                            const date = new Date(table.orderDateTime);
                            const formattedDate = date.toLocaleDateString();
                            const formattedTime = date.toLocaleTimeString();
                            return `${formattedDate} ${formattedTime}`;
                          })()}
                        </div>
                        <div>
                          <button
                            className="bg-red-700 text-white p-2 rounded-lg active:bg-red-500 hover:bg-red-300"
                            onClick={() =>
                              handleDeleteReservedTableNow(table.tableName)
                            }
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-around">
                        <div className="border-2 border-green-500 bg-opacity-30 rounded-3xl w-32 mx-auto">
                          Available
                        </div>
                        <div>
                          <button
                            className="bg-blue-700 text-white p-2 rounded-lg active:bg-blue-500 hover:bg-blue-300"
                            onClick={() => handleReserveTable(table.tableName)}
                          >
                            Reserve
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="text-center border border-gray-800 px-4 py-2">
                    {table.reservationDateTime ? (
                      <div className="flex items-center justify-around">
                        <div>
                          {(() => {
                            const date = new Date(table.reservationDateTime);
                            const formattedDate = date.toLocaleDateString();
                            const formattedTime = date.toLocaleTimeString();
                            return `${formattedDate} ${formattedTime}`;
                          })()}
                        </div>
                        <div>
                          <button
                            className="bg-red-500 hover:bg-red-300 active:bg-red-800 p-1 rounded-lg text-white"
                            onClick={() => deleteReservation(table.tableName)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="bg-green-500 hover:bg-green-300 active:bg-green-800 p-1 rounded-lg text-white"
                        onClick={() => handleReserve(table.tableName)}
                      >
                        click to reserve
                      </button>
                    )}
                  </td>
                  <td className="text-center border border-gray-800 px-4 py-2">
                    <button
                      onClick={() => handleDeleteTable(table.tableId)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
      <Modal
        isOpen={!!selectedTable}
        onRequestClose={() => setSelectedTable(null)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">
            Select Reservation Date and Time
          </h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeIntervals={15} // Set the time intervals to 15 minutes
            dateFormat="Pp"
            className="border border-gray-300 px-3 py-2 rounded mb-4"
          />
          <div className="flex justify-around">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleReserveTableFuture}
            >
              Reserve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setSelectedTable(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4">Success</h2>
          <p className="mb-4">{successMessage}</p>
        </div>
      </Modal>

      <Modal
        isOpen={showOrderIdModal}
        onRequestClose={() => setShowOrderIdModal(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Enter Dine-in Order ID</h2>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded mb-4"
          />
          <div className="flex justify-around">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleReserveTableWithOrderId}
            >
              Reserve
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowOrderIdModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
