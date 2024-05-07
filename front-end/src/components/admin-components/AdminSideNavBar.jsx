import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { GrUserWorker } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const AdminSideNavBar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-900 text-white w-1/5">
      <div className="flex justify-center items-center text-2xl text-[#FFEA2A]">
        <CgProfile className="" />
        <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
      </div>
      <div className="flex justify-center">
        <ul className="text-lg">
          <li className={`p-4 ${location.pathname === "/admin/dashboard" && "text-yellow-500"}`}>
            <Link to="/admin/dashboard" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Dashboard
                <MdDashboard className="ml-2" />
              </div>
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/bill" && "text-yellow-500"}`}>
            <Link to="/admin/bill" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Bill <FaRegMoneyBillAlt className="ml-2" />
              </div>
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/products" && "text-yellow-500"}`}>
            <Link to="/admin/products" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Products <MdInventory className="ml-2" />
              </div>
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/categories" && "text-yellow-500"}`}>
            <Link to="/admin/categories" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Categories <BiCategory className="ml-2" />
              </div>
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/employee-details" && "text-yellow-500"}`}>
            <Link to="/admin/employee-details" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Employee Details <CgDetailsMore className="ml-2" />
              </div>
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/attendance-record" && "text-yellow-500"}`}>
            <Link to="/admin/attendance-record" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Attendance Record <GrUserWorker className="ml-2" />
              </div>
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/inventory" && "text-yellow-500"}`}>
            <Link to="/admin/inventory" className="block hover:text-[#FFEA2A]">
              Inventory
            </Link>
          </li>
          <li className={`p-4 ${location.pathname === "/admin/reports" && "text-yellow-500"}`}>
            <Link to="/admin/reports" className="block hover:text-[#FFEA2A]">
              <div className="flex items-center">
                Reports <BiSolidReport className="ml-2" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideNavBar;
