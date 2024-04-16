import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="text-yellow-500">
      <span
        className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-yellow-500
        duration-300 "
      >
        <FaFacebook />
      </span>
      <span
        className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-yellow-500
        duration-300 "
      >
        <FaInstagram />
      </span>
      <span
        className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-yellow-500
        duration-300 "
      >
        <FaWhatsapp />
      </span>
    </div>
  );
};

export default SocialIcons;
