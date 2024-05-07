import "./App.css";
import { Routes, Route } from "react-router-dom";

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

//admin pages
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import AdminWelcome from "./pages/admin-pages/AdminWelcome";
import AdminProducts from "pages/admin-pages/AdminProducts";
import ProductsCategory from "pages/admin-pages/ProductsCategories";
import AddProducts from "pages/admin-pages/AddProducts";
import EmployeeDetails from "pages/admin-pages/EmployeeDetails";
import Attendence from "pages/admin-pages/Attendence";
import Report from "pages/admin-pages/Report";
import Bill from "pages/admin-pages/Bill";
import { Provider } from "react-redux";
import { store } from "store";

//staff pages
import Login from "pages/staff-pages/Login";
import Home from "pages/staff-pages/Home";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="registration" element={<RegisterAccount />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/cart" element={<MyCart />} />
          <Route path="menu/cart/checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="support" element={<Support />} />
          <Route path="track-order" element={<TrackOrder />} />

          <Route path="/admin" element={<AdminWelcome />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route
            path="/admin/products/add-products"
            element={<AddProducts />}
          />
          <Route path="/admin/categories" element={<ProductsCategory />} />
          <Route path="/admin/employee-details" element={<EmployeeDetails />} />
          <Route path="/admin/attendance-record" element={<Attendence />} />
          <Route path="/admin/bill" element={<Bill />} />
          <Route path="/admin/reports" element={<Report />} />

          <Route path="/staff" element={<Login />} />
          <Route path="/staff/deliver-order" element={<Home />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
