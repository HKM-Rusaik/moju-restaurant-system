import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPopUp = (props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulating loading process
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Simulating success
    const timer2 = setTimeout(() => {
      setSuccess(true);
    }, 2000);

    // Auto close the popup after 4 seconds
    const timer3 = setTimeout(() => {
      setSuccess(false);
      setLoading(false);
      setVisible(false); // Hide the popup
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <>
      {visible && ( // Conditionally render the pop-up based on visibility
        <div className="fixed inset-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-96 h-48 bg-white rounded-md flex flex-col items-center justify-center">
            {loading && !success && (
              <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            )}
            {success && <FaCheckCircle className="text-green-500 text-2xl" />}
            <div className="mt-4">
              {loading && !success && props.load}{" "}
              {/* Use props.load without curly braces */}
              {!loading && success && props.finish}{" "}
              {/* Use props.finish without curly braces */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPopUp;
