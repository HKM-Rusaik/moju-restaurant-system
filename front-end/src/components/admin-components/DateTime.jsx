import React, { useEffect, useState } from "react";

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString(undefined, options);
      const formattedTime = today.toLocaleTimeString();
      setCurrentDateTime({ date: formattedDate, time: formattedTime });
    };

    // Update the date and time immediately
    updateDateTime();

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex items-center mb-2">
        <div className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Date:</span>{" "}
          <span className="font-semibold text-green-600">
            {currentDateTime.date}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Time:</span>{" "}
          <span className="font-semibold text-yellow-600">
            {currentDateTime.time}
          </span>
        </div>
      </div>
    </>
  );
};

export default DateTimeDisplay;
