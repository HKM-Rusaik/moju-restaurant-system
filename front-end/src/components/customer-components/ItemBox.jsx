import React from "react";
import { FaCartPlus } from "react-icons/fa";

function ItemBox(props) {
  return (
    <div className=" w-48 mx-32 bg-gray-200 drop-shadow-lg p-2 rounded">
      <img src={props.itemImage} alt="" />
      <p>{props.name}</p>
      <p>Rs {props.price}</p>
      <FaCartPlus className="ml-32 cursor-pointer text-2xl" />
    </div>
  );
}

export default ItemBox;
