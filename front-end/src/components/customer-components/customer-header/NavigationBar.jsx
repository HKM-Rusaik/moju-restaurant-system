import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import "../../../styles/tailwind.css";
import {
  MdOutlineRestaurantMenu,
  MdAccountCircle,
  MdTableRestaurant,
  MdContactPhone,
} from "react-icons/md";
import { GiCycling } from "react-icons/gi";

const NavigationBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <div className="sticky top-0 z-50 ">
        <nav className="text-white shadow-xl bg-navBar list-none flex justify-between p-4  mx-auto rounded mt-7 overflow-hidden">
          <div className="flex items-center font-logo text-yellow-500 text-2xl border-r pr-4 cursor-pointer">
            <li>MOJU</li>
          </div>
          <div className="border-r pr-4 cursor-pointer hover:text-yellow-500">
            <li>
              <NavLink
                to="/menu"
                onClick={() => handleLinkClick("/menu")}
                className={activeLink === "/menu" ? "text-yellow-500" : ""}
              >
                <div className="flex items-center">
                  <MdOutlineRestaurantMenu className="mr-1 text-xl" />
                  Menu
                </div>
              </NavLink>
            </li>
          </div>
          <div className="border-r pr-4 cursor-pointer hover:text-yellow-500">
            <li>
              <NavLink
                to="/account"
                onClick={() => handleLinkClick("/account")}
                className={activeLink === "/account" ? "text-yellow-500" : ""}
              >
                <div className="flex items-center">
                  <MdAccountCircle className="mr-1 text-xl" />
                  My Account
                </div>
              </NavLink>
            </li>
          </div>
          <div className="border-r pr-4 cursor-pointer hover:text-yellow-500">
            <li>
              <NavLink
                to="/reservation"
                onClick={() => handleLinkClick("/reservation")}
                className={
                  activeLink === "/reservation" ? "text-yellow-500" : ""
                }
              >
                <div className="flex items-center">
                  <MdTableRestaurant className="mr-1 text-xl" />
                  Reservation
                </div>
              </NavLink>
            </li>
          </div>
          <div className="border-r pr-4 cursor-pointer hover:text-yellow-500">
            <li>
              <NavLink
                to="/support"
                onClick={() => handleLinkClick("/support")}
                className={activeLink === "/support" ? "text-yellow-500" : ""}
              >
                <div className="flex items-center">
                  <MdContactPhone className="mr-1 text-xl" />
                  Support
                </div>
              </NavLink>
            </li>
          </div>
          <div>
            <li className="flex items-center cursor-pointer hover:text-yellow-500">
              <NavLink
                to="/track-order"
                onClick={() => handleLinkClick("/track-order")}
                className={
                  activeLink === "/track-order" ? "text-yellow-500" : ""
                }
              >
                <div className="flex items-center">
                  <GiCycling className="mr-1 text-xl" />
                  Track Order
                </div>
              </NavLink>
            </li>
          </div>
        </nav>
      </div>
      <Outlet key={location.key} />
    </>
  );
};

export default NavigationBar;
