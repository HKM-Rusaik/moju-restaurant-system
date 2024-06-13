import React from "react";
import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//client pages
import Welcome from "./pages/customer-pages/Welcome";
import Account from "./pages/customer-pages/Account";
import RegisterAccount from "./pages/customer-pages/RegisterAccount";
import MyCart from "./pages/customer-pages/MyCart";
import Menu from "./pages/customer-pages/Menu";
import Reservation from "./pages/customer-pages/Reservation";
import Support from "./pages/customer-pages/Support";
import TrackOrder from "./pages/customer-pages/TrackOrder";
import Checkout from "./pages/customer-pages/Checkout";
import AuthChecker from "components/AuthChecker";

//admin pages
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import AdminWelcome from "./pages/admin-pages/AdminWelcome";
import AdminProducts from "pages/admin-pages/AdminProducts";
import ProductsCategory from "pages/admin-pages/ProductsCategories";
import AddProducts from "pages/admin-pages/AddProducts";
import EmployeeDetails from "pages/admin-pages/EmployeeDetails";
import Attendence from "pages/admin-pages/Attendence";
import Report from "pages/admin-pages/Report";
import AdminAuthChecker from "components/admin-components/AdminAuthChecker";

// import Bill from "pages/admin-pages/Bill";
import AdminReservation from "pages/admin-pages/Reservation";
import CustomerRelations from "pages/admin-pages/CustomerRelations";
import Business from "pages/admin-pages/Business";

//staff pages
import StaffAuthChecker from "components/staff-components/StaffAuthChecker";
import Login from "pages/staff-pages/Login";
import Home from "pages/staff-pages/Home";

//redux
import { Provider } from "react-redux";
import { store } from "store";

//custom components
import ProtectedRoute from "components/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51PLTXRSBjdI4hLn04suEqiSoq0cjV9uuObDq2EmdYGCbCgg1ZOjCPlnitHrGmUbHdDzdoI1TfNQ5EVhPiFQcJGAh00bZCPwyR0"
);

function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="account/registration" element={<RegisterAccount />} />
          <Route path="menu" element={<Menu />} />

          <Route path="support" element={<Support />} />
          {/* Customer routes wrapped in AuthChecker */}
          <Route element={<AuthChecker />}>
            <Route
              path="account"
              element={<ProtectedRoute element={Account} />}
            />
            <Route
              path="menu/cart"
              element={<ProtectedRoute element={MyCart} />}
            />
            <Route
              path="menu/cart/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <ProtectedRoute element={Checkout} />
                </Elements>
              }
            />
            {/* <Route
              path="menu/cart/checkout"
              element={<ProtectedRoute element={Checkout} />}
            /> */}

            <Route
              path="reservation"
              element={<ProtectedRoute element={Reservation} />}
            />

            <Route
              path="track-order"
              element={<ProtectedRoute element={TrackOrder} />}
            />
          </Route>

          {/* {admin routes} */}
          <Route path="/admin" element={<AdminWelcome />} />
          <Route element={<AdminAuthChecker />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route
              path="/admin/products/add-products"
              element={<AddProducts />}
            />
            <Route path="/admin/categories" element={<ProductsCategory />} />
            <Route
              path="/admin/employee-details"
              element={<EmployeeDetails />}
            />
            <Route path="/admin/attendance-record" element={<Attendence />} />
            <Route path="/admin/business" element={<Business />} />
            <Route path="/admin/reports" element={<Report />} />
            <Route path="/admin/reservation" element={<AdminReservation />} />
            <Route path="/admin/feedbacks" element={<CustomerRelations />} />
          </Route>

          {/* {staff routes} */}
          <Route path="/staff/login" element={<Login />} />
          <Route element={<StaffAuthChecker />}>
            <Route path="/staff/deliver-order" element={<Home />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
