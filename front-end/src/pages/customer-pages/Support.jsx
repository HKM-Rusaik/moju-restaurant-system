import React from "react";
import ContactUs from "components/customer-components/ContactUs";
import RestaurantAddress from "components/customer-components/RestaurantAddress";
import Layout from "layouts/CustomerLayout";


const Support = () => {
  return (
    <Layout>
      <div className="fade-enter-active mt-4">
        {/* <div className="text-center font-bold text-2xl mt-8">Support</div> */}
        <ContactUs />
        <RestaurantAddress />{" "}
      </div>
    </Layout>
  );
};

export default Support;