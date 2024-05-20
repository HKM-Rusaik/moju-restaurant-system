import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem as addItemAction } from "slices/cartItem";
import { toPascalCase } from "utils";

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
      className="w-48 mx-32 bg-gray-100 drop-shadow-lg p-2 rounded-lg"
    >
      <img src={props.itemImage} alt="" />
      <p className="font-bold mt-2">{toPascalCase(props.name)}</p>
      <div className="flex flex-col items-center mt-4">
        <p>Rs. {props.price}</p>
        <FaCartPlus
          className={`bg-red-500 p-1 rounded-md w-16 cursor-pointer hover:text-black active:text-gray-500 text-2xl ${
            isClicked ? "text-black" : "text-white"
          }`}
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default ItemBox;
