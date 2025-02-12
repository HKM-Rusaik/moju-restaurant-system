import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { GrUserWorker } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import LogoutPopUp from "./LogoutPopUp";
import { useNavigate } from "react-router-dom";

const AdminSideNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
    setShowLogoutPopUp(false);
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-900 text-white w-1/5">
      <div className="flex justify-center items-center text-2xl text-[#FFEA2A]">
        <CgProfile className="" />
        <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
      </div>
      <div className="flex justify-center">
        <ul className="text-lg">
          <li
            className={`p-4 ${
              location.pathname === "/admin/dashboard" && "text-yellow-500"
            }`}
          >
            <Link to="/admin/dashboard" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                <MdDashboard className="mr-2" /> Dashboard
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/business" && "text-yellow-500"
            }`}
          >
            <Link to="/admin/business" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                <FaRegMoneyBillAlt className="mr-2" /> Business
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/products" && "text-yellow-500"
            }`}
          >
            <Link to="/admin/products" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                <MdInventory className="mr-2" /> Products
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/categories" && "text-yellow-500"
            }`}
          >
            <Link to="/admin/categories" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                <BiCategory className="mr-2" /> Categories
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/employee-details" &&
              "text-yellow-500"
            }`}
          >
            <Link
              to="/admin/employee-details"
              className="block hover:text-[#FFEA2A]"
            >
              <div className="flex items-center">
                <CgDetailsMore className="mr-2" /> Employee Details
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/attendance-record" &&
              "text-yellow-500"
            }`}
          >
            <Link
              to="/admin/attendance-record"
              className="block hover:text-[#FFEA2A]"
            >
              <div className="flex items-center">
                <GrUserWorker className="mr-2" /> Attendance Record
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/reservation" && "text-yellow-500"
            }`}
          >
            <Link
              to="/admin/reservation"
              className="block hover:text-[#FFEA2A]"
            >
              <div className="flex items-center">
                <BiSolidReport className="mr-2" />
                Tables & Reservations
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/reports" && "text-yellow-500"
            }`}
          >
            <Link to="/admin/reports" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                <BiSolidReport className="mr-2" /> Reports
              </div>
            </Link>
          </li>
          <li
            className={`p-4 ${
              location.pathname === "/admin/feedbacks" && "text-yellow-500"
            }`}
          >
            <Link to="/admin/feedbacks" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                <BiSolidReport className="mr-2" />
                feedbacks & supports
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center bottom-0 py-4">
        <button
          className="text-lg text-[#FFEA2A] flex items-center hover:text-yellow-500"
          onClick={() => setShowLogoutPopUp(true)}
        >
          Logout <IoMdLogOut />
        </button>
      </div>
      {/* <div>
        <a href="/" target="_blank">
          <div className=" bg-green-500 rounded-lg p-2 hover:bg-green-700 active:bg-green-300 text-white">
            Login as Customer
          </div>
        </a>
      </div> */}
      {showLogoutPopUp && (
        <LogoutPopUp
          onCancel={() => setShowLogoutPopUp(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default AdminSideNavBar;
