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
            name={customer.firstName + " " + customer.lastName}
            firstName={customer.firstName}
            lastName={customer.lastName}
            email={customer.email}
            phoneNumber={customer.phoneNumber}
            address={customer.streetName}
            image="helloee"
          />
        ) : (
          <SignInForm />
        )}
      </div>
    </Layout>
  );
};

export default Account;
