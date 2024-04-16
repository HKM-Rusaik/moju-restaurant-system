import React from "react";
import NavigationBar from "../components/customer-components/customer-header/NavigationBar";
import Footer from "../components/customer-components/customer-footer/Footer";
const Layout = ({ children }) => {
  return (
    <div>
      <div className="customer-body">
        <NavigationBar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
