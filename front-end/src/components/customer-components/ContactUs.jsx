import React, { useState } from "react";
import axios from "axios.js";
import SuccessPopUp from "./SuccessPopUp";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    message: "",
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Email is invalid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      setShowPopUp(false);
      await axios.post("/customer/support", formData);
      setShowPopUp(true);
      // Reset form data to initial state after successful submission
      setFormData({
        customerName: "",
        customerEmail: "",
        message: "",
      });
      console.log("Form submitted:", formData);
    } catch (err) {
      console.log("Error in creating support form", err);
    }
  };

  return (
    <div>
      <div className="flex justify-center rounded-xl shadow-xl items-center min-h-screen bg-gradient-to-r from-gray-300 to-blue-200">
        <div className="bg-white p-10 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 mt-10">
          <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="customerName"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="customerEmail"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerEmail}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-lg font-semibold mb-2"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-md font-semibold text-lg hover:from-blue-600 hover:to-green-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {showPopUp && (
        <SuccessPopUp
          load="Submitting your details"
          finish="Successfully sent. We will get back to you soon!"
        />
      )}
    </div>
  );
};

export default ContactUs;
