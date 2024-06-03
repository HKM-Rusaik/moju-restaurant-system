import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const LoadingPopUp = ({ text, finishedLoad }) => {
  return (
    <div className="fixed inset-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-96 h-48 bg-white rounded-md flex flex-col items-center justify-center">
        {!finishedLoad ? (
          <div
            className={`loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin`}
          ></div>
        ) : (
          <FaCheckCircle className="text-green-500 text-2xl"/>
        )}
        <div className="mt-4">{text}</div>
      </div>
    </div>
  );
};

export default LoadingPopUp;
