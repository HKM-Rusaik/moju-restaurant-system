import React, { useState } from "react";
import axios from "axios";
import Cart from "components/customer-components/Cart";
import Layout from "layouts/CustomerLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllItems } from "slices/cartItem";

const Checkout = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [showTableNumber, setShowTableNumber] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const customerFirstName = useSelector(
    (state) => state.customer.customer.firstName
  );

  const selectedItems = useSelector((state) => state.selectedItems.cartItems);
  const orderTotal = useSelector(
    (state) => state.selectedItems.itemsPriceTotal
  );
  const customerLastName = useSelector(
    (state) => state.customer.customer.lastName
  );

  const customerId = useSelector((state) => state.customer.customer.customerId);
  const fullName = customerFirstName + " " + customerLastName;

  const handleDeliveryMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setDeliveryMethod(selectedMethod);
    setShowDeliveryDetails(selectedMethod === "delivery");
    setShowTableNumber(selectedMethod === "dine-in");
  };

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
  };

  const handlePlaceOrder = () => {
    const order = {
      customerId,
      deliveryMethod,
      orderTotal,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress : "",
      paymentMethod,
      selectedItems,
    };

    axios
      .post("http://localhost:5000/customer/orders", order)
      .then((response) => {
        // Handle successful response
        console.log("Order placed successfully:", response.data);
        // Show the success popup
        setShowSuccessPopup(true);
        dispatch(removeAllItems());
      })
      .catch((error) => {
        // Handle error
        console.error("Error placing order:", error);
        // Display an error message to the user
      });
  };

  const handleNavigateToMenu = () => {
    // Navigate to the "/menu" route
    navigate("/menu");
  };

  return (
    <Layout>
      <div>
        <Cart textColor="text-yellow-500" bgColor="bg-black" />
        <p className="bg-yellow-500 w-40 mx-auto p-2 text-center font-bold rounded shadow-md mt-4">
          Checkout
        </p>

        <div className="mx-[5%] mt-8">
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label htmlFor="customerName" className="mr-2 mb-2 w-[20%] sm:mb-0">
              Customer Name
            </label>
            <input
              readOnly
              required
              type="text"
              id="customerName"
              value={fullName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label
              htmlFor="deliveryMethod"
              className="mr-2 mb-2 w-[20%] sm:mb-0"
            >
              Delivery Method
            </label>
            <select
              id="deliveryMethod"
              value={deliveryMethod}
              onChange={handleDeliveryMethodChange}
              className="w-32 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            >
              <option value="" disabled selected>
                Choose
              </option>
              <option value="dine-in">Dine-in</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          {showDeliveryDetails && (
            <div>
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <label
                  htmlFor="deliveryAddress"
                  className="mr-2 mb-2 w-[20%] sm:mb-0"
                >
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                />
              </div>
            </div>
          )}
          {showTableNumber && (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <label
                htmlFor="tableNumber"
                className="mr-2 mb-2 w-[20%] sm:mb-0"
              >
                Table Number
              </label>
              <input
                type="text"
                id="tableNumber"
                value={deliveryAddress}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label
              htmlFor="paymentMethod"
              className="mr-2 mb-2 w-[20%] sm:mb-0"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            >
              <option value="" disabled selected>
                Choose
              </option>
              <option value="card">Card</option>
              <option value="cod">Cash on Delivery (COD)</option>
            </select>
          </div>
          {paymentMethod === "card" && (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <label htmlFor="cardNumber" className="mr-2 mb-2 w-[20%] sm:mb-0">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
              />
            </div>
          )}
          <button
            className="bg-green-500 transition delay-150 duration-300 ease-in-out hover:scale-110  text-white py-2 px-4 rounded"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

          {/* Success Popup */}
          {showSuccessPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded shadow-md max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                  Order Placed Successfully
                </h2>
                <p>Your order has been successfully placed.</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-green-500  text-white py-2 px-4 rounded"
                    onClick={handleNavigateToMenu}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
