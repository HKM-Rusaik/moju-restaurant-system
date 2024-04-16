import React from "react";
import { useState } from "react";
const CartList = (props) => {

    const [itemQuantity, setItemQuantity] = useState(0);
    const handleChange = (e) => {
        setItemQuantity(e.target.value);
    }
    
    const itemTotal = itemQuantity*Number(props.itemPrice);

  return (
    <div className="flex mt-6 w-4/5 font-bold p-2  rounded mx-auto">
      <div className="w-1/4 flex justify-center items-center">
        <img className="w-16 h-16" src={props.itemImage} alt="" />
        <p className="ml-2">{props.itemName}</p>
      </div>
      <div className="w-1/4 flex justify-center items-center">{props.itemPrice}</div>
      <div className="w-1/4 flex justify-center items-center"><input className="w-20 text-center border-gray-700 rounded shadow-lg" type="number" value={itemQuantity} onChange={handleChange}/></div>
      <div className="w-1/4 flex justify-center items-center">{itemTotal}</div>
    </div>
  );
};

export default CartList;
