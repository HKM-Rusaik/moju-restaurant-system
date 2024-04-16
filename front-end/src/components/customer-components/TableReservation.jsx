import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TableReservation = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);

  const decreaseGuestCount = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1);
    }
  };

  const increaseGuestCount = () => {
    setGuestCount(guestCount + 1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-2xl font-bold my-10">Table Reservation</p>

      <div className="flex items-center mb-2">
        <label htmlFor="total-guest" className="w-32 mr-2 text-right">
          Number of Guests
        </label>
        <div className="flex items-center">
          <button
            className="count drop-shadow bg-white hover:bg-black hover:text-white active:bg-gray-400"
            onClick={decreaseGuestCount}
          >
            -
          </button>
          <input
            className="rounded drop-shadow w-16 text-center"
            type="number"
            value={guestCount}
            min="1"
            readOnly
          />
          <button
            className="count drop-shadow bg-white hover:bg-black hover:text-white active:bg-gray-400"
            onClick={increaseGuestCount}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <label className="w-32 mr-2 text-right" htmlFor="date-slot">
          Preferred Date and Time
        </label>
        <DatePicker
          className="rounded drop-shadow w-64 text-center"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select a date"
          showTimeSelect
          minDate={new Date()}
          minTime={new Date().setHours(12, 0, 0, 0)}
          maxTime={new Date().setHours(22, 0, 0, 0)}
        />
      </div>

      <div className="flex items-center mb-2">
        <label className="w-32 mr-2 text-right" htmlFor="time-slot">
          Note
        </label>
        <input className="rounded drop-shadow w-64" type="text" />
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-blue-800 p-2 rounded text-white hover:bg-blue-500 active:bg-blue-800">
          Book Table
        </button>
      </div>
    </div>
  );
};

export default TableReservation;
