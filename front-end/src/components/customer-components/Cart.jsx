import React from "react";
import { FaCartArrowDown } from "react-icons/fa";

const Cart = (props) => {
  return (
    <div>
      <div
        className={`mt-4 w-24 flex justify-around items-center text-xl ${props.textColor}  ${props.bgColor} rounded ml-auto mr-20 py-2 px-1 cursor-pointer hover:text-black hover:bg-yellow-500`}
      >
        <FaCartArrowDown />
        Cart
      </div>
    </div>
  );
};

export default Cart;
