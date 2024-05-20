import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";
import DumImage from "../../assets/Images/Profile-dum.png";
import { setCustomer, setToken } from "slices/customerSlice";

function Profile(props) {
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

  const profileImage = props.profile || DumImage;

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

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-10">My Profile</h1>
      <div className="flex items-center justify-center mt-8">
        <div className="profile-pic mr-4">
          <div
            className={`w-[200px] h-[200px] rounded-full border-8 ${borderColor} bg-white overflow-hidden`}
          >
            <img src={props.image} alt="profile im" />
          </div>
          <p className="text-center text-xl font-semibold text-yellow-700">
            {" "}
            {props.name}
          </p>
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
              <div className="newPassword flex items-center mb-2">
                <p className="mr-8 font-bold">New Password:</p>
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
              <div className="newPassword flex items-center mb-2">
                <span className="profile-content-field">
                  Enter New Password
                </span>
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
          <button className="bg-red-800 hover:bg-red-400 active:bg-red-800 p-2 rounded text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
