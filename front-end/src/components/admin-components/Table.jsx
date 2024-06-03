import React, { useState, useEffect } from "react";
import axios from "axios.js";
import Modal from "react-modal";

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

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("/admin/tables");
        setTables(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);

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
        <div className="overflow-x-auto">
          <div className="flex mx-auto justify-center">
            <h2 className="text-2xl text-center font-bold">Tables</h2>
          </div>
          <table className="w-[65%] mx-auto border-collapse rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-800 px-4 py-2">Table Name</th>
                <th className="border border-gray-800 px-4 py-2">
                  Table Capacity
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
        isOpen={showSuccessModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4">Success</h2>
          <p className="mb-4">{successMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
