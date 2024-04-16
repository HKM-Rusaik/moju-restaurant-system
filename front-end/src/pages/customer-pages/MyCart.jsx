import React from "react";
import Cart from "components/customer-components/Cart";
import CartList from "components/customer-components/CartList";
import sampleImage from "assets/Images/welcome-food.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "layouts/CustomerLayout";

const MyCart = () => {
  const navigate = useNavigate();

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
        <CartList
          itemImage={sampleImage}
          itemName="Chicken Kottu"
          itemPrice="400"
        />
        <div className="flex w-4/5 mx-auto border-t-2 pt-2">
          <div className="flex w-3/4 justify-end font-bold"> Grand Total:</div>
          <div className="flex w-1/4 justify-center font-bold">1600</div>
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
