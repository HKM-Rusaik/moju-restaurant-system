import React from "react";

const MembershipPopup = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Membership Details</h2>
        <p className="mb-4">
          Silver Membership: Create a Account and Make orders above 30,000
        </p>
        <p className="mb-4">
          Gold Membership: Create a Account and Make orders above 50,000
        </p>
        <p className="mb-4">
          Platinum Membership: Create a Account and Make orders above 75,000
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
