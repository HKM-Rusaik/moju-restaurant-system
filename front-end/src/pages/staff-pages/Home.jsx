import React from "react";
import Header from "components/staff-components/Header";
import OrdersTable from "components/staff-components/OrderTable";

const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="m-[2%]">
        <OrdersTable />
      </div>
    </div>
  );
};

export default Home;
