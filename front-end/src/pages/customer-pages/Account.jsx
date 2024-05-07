import React from "react";
import Profile from "components/customer-components/Profile";
import Layout from "layouts/CustomerLayout";
import { useSelector } from "react-redux";
import SignInForm from "components/customer-components/SignInForm";

const Account = () => {
  const customer = useSelector((state) => state.customer.customer);

  return (
    <Layout>
      <div className="fade-enter-active">
        {customer ? (
          <Profile
            name={customer.firstName}
            firstName={customer.firstName}
            lastName={customer.lastName}
            email={customer.email}
            address={customer.streetName}
          />
        ) : (
          <SignInForm />
        )}
      </div>
    </Layout>
  );
};

export default Account;
