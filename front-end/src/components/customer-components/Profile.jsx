import React from "react";
import DumImage from "../../assets/Images/Profile-dum.png";
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

function Profile(props) {
  const profileImage = props.profile || DumImage;
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-10">My Profile</h1>
      <div className="flex items-center justify-center mt-8">
        <div className="profile-pic">
          <img src={profileImage} alt="" />
          <p>{props.name}</p>
        </div>

        <div className="bg-gray-300 p-4 rounded">
          <div className="firstName flex items-center mb-2">
            <p className="mr-16 font-bold">First Name </p>
            <span className="profile-content-field">{props.firstName}wwww</span>
            <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
          </div>

          <div className="lastName flex items-center mb-2">
            <p className="mr-16 font-bold">Last Name</p>
            <span className="profile-content-field">{props.lastName}www</span>
            <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
          </div>

          <div className="email flex items-center mb-2">
            <p className="mr-24 font-bold">Email</p>
            <span className="profile-content-field ml-2">
              {props.email}wwwe
            </span>
            <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
          </div>

          <div className="deliveryAddress flex items-center mb-2">
            <p className="mr-2 font-bold">Delivery Address</p>
            <span className="profile-content-field ml-1">
              {props.address} assdfd
            </span>
            <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
          </div>

          <div className="newPassword flex items-center mb-2">
            <p className="mr-8 font-bold">New Password</p>
            <span className="profile-content-field">Enter New Password</span>
            <EditIcon className="text-2xl ml-2 hover:cursor-pointer hover:text-white active:text-black" />
          </div>
          <button className="bg-blue-800 flex items-center  hover:bg-blue-400 active:bg-blue-800 p-2 rounded text-white">
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
