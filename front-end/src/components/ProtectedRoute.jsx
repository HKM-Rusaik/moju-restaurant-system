import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Element }) => {
  const token = useSelector((state) => state.customer.token);

  return token ? <Element /> : <Navigate to="/account" />;
};
export default ProtectedRoute;
