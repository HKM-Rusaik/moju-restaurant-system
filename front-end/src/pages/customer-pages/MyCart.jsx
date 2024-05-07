import React, { useEffect, useState } from "react";
import Cart from "components/customer-components/Cart";
import CartList from "components/customer-components/CartList";
import sampleImage from "assets/Images/welcome-food.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "layouts/CustomerLayout";
import { useSelector, useDispatch } from "react-redux";
import { addItemsTotalPrice } from "slices/cartItem";

const MyCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deliveryFee, setDeliveryFee] = useState(200); // Default delivery fee

  const cartItems = useSelector((state) => state.selectedItems.cartItems);
  const itemsTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  // Calculate total price when cartItems change
  useEffect(() => {
    dispatch(addItemsTotalPrice(itemsTotal));
    // Update delivery fee based on items total
    if (itemsTotal > 4000) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(200); // Default delivery fee
    }
  }, [cartItems, dispatch, itemsTotal]);

  const handleShopMoreClick = () => {
    // Navigate to the main page when ShopMore button is clicked
    navigate("/menu");
  };

  return (
    <Layout>
      <div>
        <Cart textColor="text-black-500" bgColor="bg-yellow-500" />
        <div className="flex mt-6 w-4/5 font-bold p-2 bg-gray-300 rounded mx-auto">
          <div className="w-1/4 flex justify-center">Items</div>
          <div className="w-1/4 flex justify-center">Price</div>
          <div className="w-1/4 flex justify-center">Quantity</div>
          <div className="w-1/4 flex justify-center">Total</div>
        </div>

        {cartItems.map((cartItem) => (
          <CartList
            key={cartItem.itemId}
            itemImage={sampleImage}
            itemName={cartItem.name}
            itemPrice={cartItem.price}
            quantity={cartItem.quantity}
            itemId={cartItem.itemId}
          />
        ))}
        <div className="flex w-4/5 mx-auto border-t-2 pt-2">
          <div className="flex w-3/4 justify-end font-bold"> Items Total: </div>
          <div className="flex w-1/4 justify-center font-bold">
            {itemsTotal}
          </div>
        </div>
        <div className="flex w-4/5 mx-auto border-t-2 pt-2 text-red-500">
          <div className="flex w-3/4 justify-end font-bold ">
            {" "}
            Delivery Fee:{" "}
          </div>
          <div className="flex w-1/4 justify-center font-bold">
            {deliveryFee}
          </div>
        </div>
        <div className="flex w-4/5 mx-auto border-t-2 pt-2 text-green-500">
          <div className="flex w-3/4 justify-end font-bold"> Grand Total: </div>
          <div className="flex w-1/4 justify-center font-bold">
            {itemsTotal + deliveryFee}
          </div>
        </div>
        <div className="flex w-4/5 mx-auto text-white pt-4">
          <div className="flex w-1/2 justify-start">
            <button
              onClick={handleShopMoreClick}
              className="bg-blue-500 p-1 rounded"
            >
              Shop More
            </button>
          </div>
          <div className="flex w-1/2 justify-end">
            <Link to="checkout">
              <button className="bg-green-500 p-1 rounded">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyCart;
