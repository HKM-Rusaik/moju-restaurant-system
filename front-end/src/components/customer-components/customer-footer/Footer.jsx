import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menu";

const Footer = () => {
  return (
    <footer className="bg-navBar text-white mt-16 w-full">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-yellow-400"> Subscribe</span> to get the
          promotion and offer updates
        </h1>

        <div>
          <input
            type="text"
            placeholder="Enter your email"
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-600 duration-300 px-5 py-2.5 rounded-md text-black
                md:w-auto w-full"
          >
            {" "}
            Subscribe
          </button>
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center bg-black pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 MOJU. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
