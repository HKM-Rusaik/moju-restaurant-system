import React, { useState, useEffect } from "react";
import axios from "axios.js";
import Cart from "components/customer-components/Cart";
import Layout from "layouts/CustomerLayout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAllItems } from "slices/cartItem";
import BillPDF from "components/customer-components/BillPdf";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "firebase.js";
import { pdf } from "@react-pdf/renderer";
import PaymentForm from "components/customer-components/PaymentForm";
import { addItemsTotalPrice } from "slices/cartItem";

const Checkout = () => {
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
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [atRestaurant, setAtRestaurant] = useState(null); // State to track if the customer is at the restaurant or outside
  const [tables, setTables] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getTables = async () => {
      const response = await axios.get("/admin/tables");
      setTables(response.data);
    };
    getTables();
  }, []);

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
  if (customer.email === "mojoadmin@gmail.com") discountPercentage = 0;

  const itemsTotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  useEffect(() => {
    setDeliveryAddress(address);
  }, [address, deliveryMethod]);

  useEffect(() => {
    if (itemsTotal < 4000 && deliveryMethod === "delivery") {
      setDeliveryFee(200);
    } else {
      setDeliveryFee(0);
    }
  }, [itemsTotal, deliveryMethod]);

  const discountAmount = Math.round(
    (itemsTotal + deliveryFee) * (discountPercentage / 100)
  );

  let grandTotal;

  if (deliveryMethod === "delivery") {
    grandTotal = itemsTotal + deliveryFee - discountAmount;
  } else {
    grandTotal = itemsTotal - discountAmount;
  }

  useEffect(() => {
    dispatch(addItemsTotalPrice(grandTotal));
  }, [cartItems, dispatch, grandTotal]);

  const handleDeliveryMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setDeliveryMethod(selectedMethod);
    setShowDeliveryDetails(selectedMethod === "delivery");
    setShowTableNumber(selectedMethod === "dine-in");
    setAtRestaurant(null);
  };

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!fullName) newErrors.customerName = "Customer name is required";
    if (!deliveryMethod)
      newErrors.deliveryMethod = "Delivery method is required";
    if (deliveryMethod === "delivery" && !deliveryAddress)
      newErrors.deliveryAddress = "Delivery address is required";
    if (deliveryMethod === "dine-in" && atRestaurant && !tableNumber)
      newErrors.tableNumber = "Table number is required";
    if (!paymentMethod) newErrors.paymentMethod = "Payment method is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateFields()) return;
    let addressToUse = deliveryAddress;
    if (deliveryMethod === "takeaway") {
      addressToUse = "";
    } else if (showTableNumber && atRestaurant) {
      addressToUse = tableNumber;
    }
    const newOrder = {
      customerId,
      deliveryMethod,
      orderTotal,
      deliveryAddress: addressToUse,
      paymentMethod,
      selectedItems,
    };

    try {
      console.log(newOrder);
      const response = await axios.post("customer/orders", newOrder);
      const createdOrder = response.data.newOrder;
      console.log(createdOrder);
      const orderId = createdOrder.orderId;

      // Generate the PDF
      const pdfBlob = await pdf(
        <BillPDF
          order={createdOrder}
          itemTotal={itemsTotal}
          cartItems={cartItems}
          deliveryFee={deliveryFee}
          discountAmount={discountAmount}
          grandTotal={grandTotal}
          customer={customer}
        />
      ).toBlob();

      // Upload the PDF to Firebase
      const pdfUrl = await uploadPDFToFirebase(pdfBlob);

      // Update the order in the database with the PDF URL
      await axios.put(`/customer/order/${orderId}`, {
        pdfUrl,
      });

      if (tableNumber !== "") {
        await axios.put(`/admin/tables/update/${tableNumber}`, {
          orderId,
        });
        setTableNumber("");
      }

      setShowSuccessPopup(true);
      dispatch(removeAllItems());
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handlePaymentSuccess = () => {
    handlePlaceOrder();
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

  const handleAtRestaurantChange = (event) => {
    setAtRestaurant(event.target.value === "at-restaurant");
    if (!atRestaurant && showTableNumber) {
      setDeliveryAddress("Call to make sure the dine-in");
    }
  };

  console.log(deliveryAddress);
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
              Customer Name <span className="text-red-500">*</span>
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
            {errors.customerName && (
              <span className="text-red-500">{errors.customerName}</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label
              htmlFor="deliveryMethod"
              className="mr-2 mb-2 w-[20%] sm:mb-0"
            >
              Delivery Method <span className="text-red-500">*</span>
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
            {errors.deliveryMethod && (
              <span className="text-red-500">{errors.deliveryMethod}</span>
            )}
          </div>
          {deliveryMethod === "dine-in" && (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <label
                htmlFor="atRestaurant"
                className="mr-2 mb-2 w-[20%] sm:mb-0"
              >
                Are you at the restaurant?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="atRestaurant"
                  name="dineInOption"
                  value="at-restaurant"
                  onChange={handleAtRestaurantChange}
                  className="mr-2"
                />
                <label htmlFor="atRestaurant" className="mr-4">
                  Yes
                </label>
                <input
                  type="radio"
                  id="outsideRestaurant"
                  name="dineInOption"
                  value="outside-restaurant"
                  onChange={handleAtRestaurantChange}
                  className="mr-2"
                />
                <label htmlFor="outsideRestaurant">No</label>
              </div>
              {errors.deliveryAddress && (
                <span className="text-red-500">{errors.deliveryAddress}</span>
              )}
            </div>
          )}
          {showDeliveryDetails && (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <label
                htmlFor="deliveryAddress"
                className="mr-2 mb-2 w-[20%] sm:mb-0"
              >
                Delivery Address <span className="text-red-500">*</span>
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
              {errors.deliveryAddress && (
                <span className="text-red-500">{errors.deliveryAddress}</span>
              )}
            </div>
          )}
          {atRestaurant && showTableNumber && (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <label
                htmlFor="tableNumber"
                className="mr-2 mb-2 w-[20%] sm:mb-0"
              >
                Table Number <span className="text-red-500">*</span>
              </label>

              <select
                id="selectedTable"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-64 rounded border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                required
              >
                <option value="" disabled>
                  Select a table
                </option>
                {tables.map((table) => (
                  <option key={table.tableId} value={table.tableName}>
                    {table.tableName}
                  </option>
                ))}
              </select>
              {errors.tableNumber && (
                <span className="text-red-500">{errors.tableNumber}</span>
              )}
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label htmlFor="cardNumber" className="mr-2 mb-2 w-[20%] sm:mb-0">
              Orders Total Amount
            </label>
            <input
              type="text"
              id="grandTotal"
              readOnly
              value={`Rs. ${itemsTotal}`}
              className="w-64 rounded border-gray-300 shadow-sm  focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            />
          </div>
          {deliveryMethod === "delivery" && (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <label htmlFor="cardNumber" className="mr-2 mb-2 w-[20%] sm:mb-0">
                Delivery Fee{" "}
              </label>
              <input
                type="text"
                id="grandTotal"
                readOnly
                value={`Rs. ${deliveryFee}`}
                className="w-64 rounded border-gray-300 shadow-s  focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label htmlFor="cardNumber" className="mr-2 mb-2 w-[20%] sm:mb-0">
              Membership Discount
            </label>
            <input
              type="text"
              id="grandTotal"
              readOnly
              value={`Rs. ${discountAmount}`}
              className="w-64 rounded border-gray-300 shadow-sm  focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label htmlFor="cardNumber" className="mr-2 mb-2 w-[20%] sm:mb-0">
              Grand Total
            </label>
            <input
              type="text"
              id="grandTotal"
              readOnly
              value={`Rs. ${grandTotal}`}
              className="w-64 rounded border-gray-300 shadow-sm text-white bg-blue-500 focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label
              htmlFor="paymentMethod"
              className="mr-2 mb-2 w-[20%] sm:mb-0"
            >
              Payment Method <span className="text-red-500">*</span>
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
            {errors.paymentMethod && (
              <span className="text-red-500">{errors.paymentMethod}</span>
            )}
          </div>

          {paymentMethod === "card" && (
            <div>
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
            </div>
          )}

          {paymentMethod !== "card" && (
            <button
              className="bg-green-500 transition delay-150 duration-300 ease-in-out hover:scale-110 active:bg-green-700 text-white py-2 px-4 rounded"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          )}

          {showSuccessPopup && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded shadow-md max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                  Order Placed Successfully
                </h2>
                <p>Your order has been successfully placed.</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded"
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
