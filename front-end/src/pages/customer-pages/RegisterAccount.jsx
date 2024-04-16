import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "layouts/CustomerLayout";

const RegisterAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation before submitting
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      //submitting form
      try {
        const response = await axios.post(
          "http://localhost:5000/customer/register",
          formData
        );

        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error("Error registering user:");
        setErrors(error.response.data);
      }

      // console.log("Form data submitted:", formData);
    } else {
      console.log("Form contains errors. Please fix them.");
    }
  };

  const validateForm = (data) => {
    //simple validation
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Layout>
      <div>
        <div className="text-center text-2xl font-bold my-10 underline underline-offset-2">
          Register Your Account
        </div>
        <div className="flex justify-center mt-12">
          <form onSubmit={handleSubmit} className="register">
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="firstName" className="font-bold basis-1/2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className=" flex flex-row items-center mb-2">
              <label htmlFor="lastName" className="basis-1/2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName}</p>
              )}
            </div>
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="street" className="basis-1/2">
                Street
              </label>
              <input
                type="text"
                name="street"
                placeholder="Street Name"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="city" className="basis-1/2">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="phoneNumber" className="basis-1/2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number..."
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="email" className="basis-1/2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="password" className="basis-1/2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-row items-center mb-2">
              <label htmlFor="confirmPassword" className="basis-1/2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded text-white shadow-md hover:bg-blue-700"
            >
              Register Your Account
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterAccount;
