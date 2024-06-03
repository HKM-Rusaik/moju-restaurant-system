import React from "react";

export const MessageShowPopUp = ({ onClose, message }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <div className="text-red-500 mb-4 font-bold"> {message}</div>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
