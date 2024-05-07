import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem as addItemAction } from "slices/cartItem";

function ItemBox(props) {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleAddToCart = () => {
    const itemWithQuantity = { ...props, quantity: 1 };
    dispatch(addItemAction(itemWithQuantity));
    setIsClicked(true);
  };

  return (
    <div
      key={props.itemId}
      className="w-48 mx-32 bg-gray-200 border-2 border-black	 drop-shadow-lg p-2 rounded"
    >
      <img src={props.itemImage} alt="" />
      <p>{props.name}</p>
      <p>Rs {props.price}</p>
      <FaCartPlus
        className={`ml-32 cursor-pointer hover:text-black active:text-gray-500 text-2xl ${
          isClicked ? "text-black" : "text-white"
        }`}
        onClick={handleAddToCart}
      />
    </div>
  );
}

export default ItemBox;
