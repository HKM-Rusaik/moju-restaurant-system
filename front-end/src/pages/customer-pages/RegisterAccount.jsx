import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "layouts/CustomerLayout";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaCalendarAlt,
} from "react-icons/fa";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  &:focus {
    border-color: #80bdff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.25rem;
`;

const RegisterButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

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
    dateOfBirth: "",
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
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/customer/register",
          formData
        );

        console.log(response.data);
        window.alert("Successfully Registered");
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error.response.data.error);
        setErrors({ error: error.response.data.error });
      }
    } else {
      console.log("Form contains errors. Please fix them.");
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!data.street.trim()) {
      errors.street = "Street is required";
    }

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!isValidPhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number format";
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

    if (!data.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    } else if (!isValidDateOfBirth(data.dateOfBirth)) {
      errors.dateOfBirth = "You must be at least 15 years old";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNUmberRegex = /^\d{10}$/;
    return phoneNUmberRegex.test(phoneNumber);
  };

  const isValidDateOfBirth = (dateOfBirth) => {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    // Check if the user's age is less than 15
    if (age < 15) {
      return false;
    } else if (age === 15) {
      // Check if the user's age is exactly 15, ensure they have had their birthday this year
      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        return false;
      }
    }

    return true;
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <FormContainer>
          <div className="text-center text-2xl font-bold mb-6">
            Register Your Account
          </div>
          {errors.error && (
            <div className="text-red-500 text-center">{errors.error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormGroup>
              <Label htmlFor="firstName">
                <FaUser className="mr-2" /> First Name{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="firstName"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">
                <FaUser className="mr-2" /> Last Name{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="street">
                <FaMapMarkerAlt className="mr-2" /> Street{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="street"
                placeholder="Street Name"
                value={formData.street}
                onChange={handleChange}
              />
              {errors.street && <ErrorMessage>{errors.street}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="city">
                <FaCity className="mr-2" /> City{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dateOfBirth">
                <FaCalendarAlt className="mr-2" /> Date of Birth{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && (
                <ErrorMessage>{errors.dateOfBirth}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phoneNumber">
                <FaPhone className="mr-2" /> Phone Number{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <FaEnvelope className="mr-2" /> Email{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                <FaLock className="mr-2" /> Password{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">
                <FaLock className="mr-2" /> Confirm Password{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
              )}
            </FormGroup>

            <RegisterButton type="submit">Register Your Account</RegisterButton>
          </form>
        </FormContainer>
      </div>
    </Layout>
  );
};

export default RegisterAccount;
