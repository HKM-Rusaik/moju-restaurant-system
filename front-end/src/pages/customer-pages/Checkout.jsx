import React from "react";
import Cart from "components/customer-components/Cart";
import Layout from "layouts/CustomerLayout";

const Checkout = () => {
  return (
    <Layout>
      <div>
        <Cart textColor="text-yellow-500" bgColor="bg-black" />
        <p className="bg-yellow-500 w-40 mx-auto p-2 text-center font-bold rounded shadow-md mt-4">
          Checkout
        </p>
      </div>
    </Layout>
  );
};

export default Checkout;
