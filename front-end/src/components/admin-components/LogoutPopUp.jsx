import React from "react";

const LogoutPopUp = ({ onCancel, onLogout }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-xl font-bold mb-4 text-black">Log out account</p>
        <p className="mb-4 text-black">Are you sure you want to log out</p>
        <div className="flex justify-center">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopUp;
