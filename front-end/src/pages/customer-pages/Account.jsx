import React from "react";
import Profile from "components/customer-components/Profile";
import Layout from "layouts/CustomerLayout";

const Account = () => {
  return (
    <Layout>
      <div className="fade-enter-active">
        <Profile />
      </div>
    </Layout>
  );
};

export default Account;
