import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";
import { setCustomer, setToken } from "slices/customerSlice";
import axios from "axios.js";

function Profile(props) {
  const [showConfirmationPop, setConfirmationPop] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer.customer);

  const customerMembership = useSelector((state) => {
    const customer = state.customer.customer;
    return customer ? customer.membership.toLowerCase() : "";
  });

  let borderColor = "border-black";

  if (customerMembership === "silver") borderColor = "border-[#C0C0C0]";
  if (customerMembership === "golden") borderColor = "border-[#FFD700]";
  if (customerMembership === "platenium") borderColor = "border-[#E5E4E2]";

  const firstNameFirstLetter = props.firstName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setCustomer(null));
    dispatch(setToken(null));
    navigate("/account");
  };

  const confirmLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      handleLogout();
    }
  };

  const handleDeleteAccount = () => {
    setConfirmationPop(true);
  };

  const handleCancel = () => {
    setConfirmationPop(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete("/customer/deleteAccount");

      if (response.status === 200) {
        // Successfully deleted
        handleLogout(); // Log out the user
      } else {
        console.error("Failed to delete account");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
    } finally {
      setConfirmationPop(false);
    }
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);

    try {
      const response = await axios.put(
        `/customer/updateProfile/${customer.customerId}`,
        {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          streetName: formData.get("street"),
          cityName: formData.get("city"),
          phoneNumber: formData.get("phoneNumber"),
          email: formData.get("email"),
        }
      );

      if (response.status === 200) {
        // Handle success
        console.log("Profile updated successfully");
        toggleEditForm(); // Hide edit form
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-10">My Profile</h1>
      <div className="flex items-center justify-center mt-8">
        <div className="profile-pic flex flex-col items-center mr-4">
          <div
            className={`w-[200px] h-[200px] flex rounded-full border-8 ${borderColor} bg-white overflow-hidden`}
          >
            <div className="flex items-center mx-auto">
              {props.profile ? (
                <img
                  src={props.image}
                  alt={props.firstName}
                  className="text-gray-600"
                />
              ) : (
                <div className={`text-[150px] text-center$ {borderColor}`}>
                  {firstNameFirstLetter}
                </div>
              )}
            </div>
          </div>
          <p className="text-center text-xl font-semibold text-yellow-700">
            {" "}
            {props.name}
          </p>
          <p className="text-center text-xl font-semibold text-gray-500">
            {" "}
            {customer.email === "mojoadmin@gmail.com" ? (
              <div>You are admin</div>
            ) : (
              <div>{"you are a " + customerMembership + " member"}</div>
            )}
          </p>
          {/* Edit Profile Button */}
          <button
            onClick={toggleEditForm}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-gray-300 p-4 rounded">
          <div className="flex">
            <div className="labels flex flex-col justify-between">
              <div className="firstName flex items-center mb-2">
                <p className="mr-16 font-bold">First Name:</p>
              </div>
              <div className="lastName flex items-center mb-2">
                <p className="mr-16 font-bold">Last Name:</p>
              </div>
              <div className="email flex items-center mb-2">
                <p className="mr-24 font-bold">Email:</p>
              </div>
              <div className="phoneNumber flex items-center mb-2">
                <p className="mr-24 font-bold">Phone Number:</p>
              </div>
              <div className="deliveryAddress flex items-center mb-2">
                <p className="mr-2 font-bold">Delivery Address:</p>
              </div>
            </div>
            <div className="fields">
              <div className="firstName flex items-center mb-2">
                <span className="profile-content-field">{props.firstName}</span>
                <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
              </div>
              <div className="lastName flex items-center mb-2">
                <span className="profile-content-field">{props.lastName}</span>
                <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
              </div>
              <div className="lastName flex items-center mb-2">
                <span className="profile-content-field">{props.email}</span>
                <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
              </div>
              <div className="lastName flex items-center mb-2">
                <span className="profile-content-field">
                  {props.phoneNumber}
                </span>
                <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
              </div>
              <div className="lastName flex items-center mb-2">
                <span className="profile-content-field">{props.address}</span>
                <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
              </div>
            </div>
          </div>

          <button
            onClick={confirmLogout}
            className="bg-blue-800 flex items-center mt-2 hover:bg-blue-400 active:bg-blue-800 p-2 rounded text-white"
          >
            <IoLogOut />
            Logout
          </button>
          <br />
          <br />
          <button
            onClick={handleDeleteAccount}
            className="bg-red-800 hover:bg-red-400 active:bg-red-800 p-2 rounded text-white"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Pop-up */}
      {showConfirmationPop && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-bold mb-4">Delete your account</p>
            <p className="mb-4">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl font-bold mb-4">Edit your profile</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={props.firstName}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={props.lastName}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street Name
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  defaultValue={customer.streetName}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City Name
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={customer.cityName}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={props.phoneNumber}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={props.email}
                  readOnly
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleEditForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
