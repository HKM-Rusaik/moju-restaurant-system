import React from "react";
import OrderItem from "components/customer-components/OrderItem";
import Layout from "layouts/CustomerLayout";

const TrackOrder = () => {
  return (
    <Layout>
      <div className="fade-enter-active ">
        <OrderItem />
      </div>
    </Layout>
  );
};

export default TrackOrder;
