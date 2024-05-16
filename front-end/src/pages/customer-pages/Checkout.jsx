import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "components/customer-components/Cart";
import Layout from "layouts/CustomerLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllItems } from "slices/cartItem";
import BillPDF from "components/customer-components/BillPdf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "firebase.js";
import { pdf } from "@react-pdf/renderer";

const Checkout = () => {
  //upload and get the url of pdf in firebase
  const uploadPDFToFirebase = async (pdfBlob) => {
    const pdfRef = ref(storage, `orders/${Date.now()}.pdf`);
    await uploadBytes(pdfRef, pdfBlob);
    const url = await getDownloadURL(pdfRef);
    return url;
  };

  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [showTableNumber, setShowTableNumber] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(200);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let address = useSelector(
    (state) =>
      state.customer.customer.streetName +
      ". " +
      state.customer.customer.cityName
  );

  const customerFirstName = useSelector(
    (state) => state.customer.customer.firstName
  );
  const customerLastName = useSelector(
    (state) => state.customer.customer.lastName
  );
  const fullName = customerFirstName + " " + customerLastName;

  const selectedItems = useSelector((state) => state.selectedItems.cartItems);
  const orderTotal = useSelector(
    (state) => state.selectedItems.itemsPriceTotal
  );

  const customerId = useSelector((state) => state.customer.customer.customerId);
  const customer = useSelector((state) => state.customer.customer);

  const cartItems = useSelector((state) => state.selectedItems.cartItems);

  const customerMembership = useSelector(
    (state) => state.customer.customer.membership
  ).toLowerCase();

  let discountPercentage = 0;

  if (customerMembership === "silver") discountPercentage = 5;
  if (customerMembership === "golden") discountPercentage = 10;
  if (customerMembership === "platenium") discountPercentage = 20;

  const itemsTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    setDeliveryAddress(address);
  }, [address]);

  useEffect(() => {
    if (itemsTotal > 4000) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(200);
    }
  }, [itemsTotal]);

  const discountAmount =
    (itemsTotal + deliveryFee) * (discountPercentage / 100);

  const grandTotal = itemsTotal + deliveryFee - discountAmount;

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

  const handlePlaceOrder = async () => {
    // Generate the PDF as a blob
    const pdfBlob = await pdf(
      <BillPDF
        order=""
        itemTotal={itemsTotal}
        cartItems={cartItems}
        deliveryFee={deliveryFee}
        discountAmount={discountAmount}
        grandTotal={grandTotal}
        customer={customer}
      />
    ).toBlob();

    // Upload PDF to Firebase and get the download URL
    const pdfUrl = await uploadPDFToFirebase(pdfBlob);

    const order = {
      customerId,
      deliveryMethod,
      orderTotal,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress : "",
      paymentMethod,
      selectedItems,
      pdfUrl,
    };

    console.log(deliveryMethod);

    axios
      .post("http://localhost:5000/customer/orders", order)
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        setShowSuccessPopup(true);
        dispatch(removeAllItems());
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const handleNavigateToMenu = () => {
    navigate("/menu");
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleAddressSave = () => {
    setIsEditingAddress(false);
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
                <div className="flex items-center">
                  <input
                    type="text"
                    id="deliveryAddress"
                    value={deliveryAddress}
                    readOnly={!isEditingAddress}
                    onChange={handleAddressChange}
                    className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                  />
                  {isEditingAddress ? (
                    <button
                      className="ml-2 bg-blue-500 text-white py-1 px-2 rounded"
                      onClick={handleAddressSave}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="ml-2 bg-yellow-500 text-white py-1 px-2 rounded"
                      onClick={handleEditAddress}
                    >
                      Change
                    </button>
                  )}
                </div>
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

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label htmlFor="cardNumber" className="mr-2 mb-2 w-[20%] sm:mb-0">
              Grand Total
            </label>
            <input
              type="number"
              id="grandTotal"
              readOnly
              value={grandTotal}
              className="w-64 rounded border-gray-300 shadow-sm bg-blue-500 text-white focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            />
          </div>
          <button
            className="bg-green-500 transition delay-150 duration-300 ease-in-out hover:scale-110 active:bg-green-700 text-white py-2 px-4 rounded"
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
