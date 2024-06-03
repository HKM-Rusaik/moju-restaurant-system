import React from "react";

const MembershipPopup = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Membership Details</h2>
        <p className="mb-4">
          <span className="bg-[#C0C0C0] px-2 rounded-md">
            Silver Membership:
          </span>{" "}
          Create a Account and Make orders above <strong>Rs. 30,000</strong>
        </p>
        <p className="mb-4">
          <span className="bg-[#FFD700] px-2 rounded-md">Gold Membership:</span>{" "}
          Create a Account and Make orders above <strong>Rs. 50,000</strong>
        </p>
        <p className="mb-4">
          <span className="bg-[#E5E4E2] px-2 rounded-md">
            Platinum Membership:
          </span>{" "}
          Create a Account and Make orders above <strong>Rs. 75,000</strong>
        </p>
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

export default MembershipPopup;
