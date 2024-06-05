import React from "react";
import Profile from "components/customer-components/Profile";
import Layout from "layouts/CustomerLayout";
import { useSelector } from "react-redux";
import SignInForm from "components/customer-components/SignInForm";
import ProfilePicUpload from "components/customer-components/ProfilePicUpload";

const Account = () => {
  const customer = useSelector((state) => state.customer.customer);

  return (
    <Layout>
      <div className="fade-enter-active">
        {/* <ProfilePicUpload /> */}
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
          <div>
            <div className="text-center mt-4 text-red-500 text-xl font-bold">
              Please Sign In to Proceed More
            </div>
            <SignInForm />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Account;
