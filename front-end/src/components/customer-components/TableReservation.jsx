import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios.js";
import { useSelector } from "react-redux";

const TableReservation = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState("");

  const customerId = useSelector((state) => state.customer.customer.customerId);
  console.log(customerId);

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

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleBookTable = async () => {
    if (!selectedDate || selectedDate <= new Date()) {
      alert("Please select a future date and time.");
      return;
    }

    const reservationData = {
      customerId,
      noOfGuests: guestCount,
      reservationDate: selectedDate,
      note,
    };

    try {
      const response = await axios.post(
        "/customer/reservation",
        reservationData
      );
      console.log("Reservation successful:", response.data);
      alert("Table reserved successfully!");

      setGuestCount(1);
      setNote("");
      setSelectedDate(null); // Clear selected date after successful reservation
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("There was an error making the reservation. Please try again.");
    }
  };

  return (
    <div className="">
      <p className="text-center text-2xl font-bold my-10">Table Reservation</p>

      <div className="flex justify-center">
        <div className="flex justify-center text-center font-bold mb-4 p-2 text-white rounded w-fit bg-green-500">
          Make Reservation
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-around">
          <label htmlFor="total-guest" className="">
            Number of Guests
          </label>
          <label className="mr-2" htmlFor="date-slot">
            Preferred Date and Time
          </label>
          <label className="w-32 mr-2" htmlFor="time-slot">
            Note
          </label>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <button
                className="count drop-shadow bg-white hover:bg-black hover:text-white active:bg-gray-400"
                onClick={decreaseGuestCount}
              >
                -
              </button>
              <input
                className="rounded drop-shadow border-gray-300  w-16 text-center"
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
            <DatePicker
              className="rounded drop-shadow w-64 text-center border border-gray-300 px-3 py-2"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select a date"
              showTimeSelect
              timeIntervals={15} // Set the time intervals to 15 minutes
              minDate={new Date()}
              minTime={new Date(new Date().setHours(12, 0, 0, 0))}
              maxTime={new Date(new Date().setHours(22, 0, 0, 0))}
            />
          </div>
          <div className="flex items-center">
            <input
              className="rounded drop-shadow w-64 text-center border border-gray-300 px-3 py-2"
              type="text"
              value={note}
              onChange={handleNoteChange}
              placeholder="Add a note (optional)"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2 ml-16">
        <button
          className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleBookTable}
        >
          Book Table
        </button>
      </div>
    </div>
  );
};

export default TableReservation;
