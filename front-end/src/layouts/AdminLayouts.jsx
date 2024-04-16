import React from "react";
import AdminSideNavBar from "components/admin-components/AdminSideNavBar.jsx";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="">
        <AdminSideNavBar />
      </div>
      <div className="ml-[20%] mt-4">{children}</div>
    </div>
  );
};

export default Layout;
