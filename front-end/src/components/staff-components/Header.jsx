import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 mx-[5%] ">
        <nav className="text-white shadow-xl bg-navBar list-none flex justify-between p-4  mx-auto rounded mt-7 overflow-hidden">
          <div className="flex items-center font-logo text-yellow-500 text-2xl border-r pr-4 cursor-pointer">
            <li>MOJU</li>
          </div>
          <div className="flex items-center text-white text-2xl pr-4 font-bold">
            <li>Kitchen Interface</li>
          </div>
          <div className="flex items-center text-white text-xl border-l pl-4 cursor-pointer hover:text-yellow-500">
            <div className="mr-2">Sign out</div>
            <div>
              <FaSignOutAlt />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
