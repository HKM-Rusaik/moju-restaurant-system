import React from "react";

const OrderStatusIcon = ({ status }) => {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300">
      <svg
        className={`w-4 h-4 ${status ? "text-green-500" : "text-gray-400"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {status ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        )}
      </svg>
    </div>
  );
};

export default OrderStatusIcon;
