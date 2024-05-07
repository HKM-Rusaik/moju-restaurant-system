import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.selectedItems.cartItems);

  const noOfItems = cartItems.length;
  return (
    <div>
      <div
        className={`mt-4 w-24 flex justify-around items-center text-xl ${props.textColor}  ${props.bgColor} rounded ml-auto mr-20 py-2 px-1 cursor-pointer hover:text-black hover:bg-yellow-500`}
      >
        <FaCartArrowDown />
        Cart<sup>{noOfItems}</sup>
      </div>
    </div>
  );
};

export default Cart;
