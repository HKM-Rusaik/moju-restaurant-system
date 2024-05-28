// components/PaymentForm.js

import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      onPaymentSuccess(paymentMethod.id);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-md p-8 bg-white rounded shadow-2xl"
    >
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="border border-gray-300 rounded p-2">
          <CardElement
            className="p-2"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded transition duration-200 ease-in-out hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
