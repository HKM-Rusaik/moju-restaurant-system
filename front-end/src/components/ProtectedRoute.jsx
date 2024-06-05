import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "pages/customer-pages/Account";

const ProtectedRoute = ({ element: Element }) => {
  const token = useSelector((state) => state.customer.token);

  return token ? <Element /> : (<Account />);
};
export default ProtectedRoute;
