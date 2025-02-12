import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "slices/cartItem"; // Assuming you have an action to update item quantity
import { MdCancel } from "react-icons/md";

const CartList = (props) => {
  const [itemQuantity, setItemQuantity] = useState(props.quantity); // Initialize with the quantity passed as props
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    // Ensure the value is a non-negative number
    if (value >= 1) {
      setItemQuantity(value);
      // Dispatch an action to update the item quantity in the Redux store
      dispatch(updateItemQuantity({ itemId: props.itemId, quantity: value }));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(props.itemId));
  };

  const itemTotal = itemQuantity * Number(props.itemPrice);

  return (
    <div className="flex mt-6 w-4/5 font-bold p-2 rounded mx-auto">
      <div className="w-1/4 flex justify-start items-center">
        <img className="w-16 h-16 rounded-lg" src={props.itemImage} alt="" />
        <p className="ml-2">{props.itemName}</p>
      </div>
      <div className="w-1/4 flex justify-center items-center">
        {props.itemPrice}
      </div>
      <div className="w-1/4 flex justify-center items-center">
        <input
          className="w-20 text-center border-gray-700 rounded shadow-lg"
          type="number"
          value={itemQuantity}
          onChange={handleChange}
          min="1"
        />
      </div>
      <div className="w-1/4 flex justify-center items-center">{itemTotal}</div>
      <div
        onClick={handleRemove}
        className="w-1/4 text-xl text-red-500 hover:text-red-700 hover:cursor-pointer flex justify-center items-center"
      >
        <MdCancel />
      </div>
    </div>
  );
};

export default CartList;
