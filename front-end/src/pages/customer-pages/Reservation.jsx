import React from "react";
import TableReservation from "components/customer-components/TableReservation";
import Layout from "layouts/CustomerLayout";

const Reservation = () => {
  return (
    <Layout>
      <div className="fade-enter-active">
        <TableReservation />
      </div>
    </Layout>
  );
};

export default Reservation;
