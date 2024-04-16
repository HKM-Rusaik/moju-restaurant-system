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

function App() {
  return (
    <div>
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
        <Route path="/admin/products/add-products" element={<AddProducts />} />
        <Route path="/admin/categories" element={<ProductsCategory />} />
        <Route path="/admin/employee-details" element={<AdminDashboard />} />
        <Route path="/admin/attendence-record" element={<AdminDashboard />} />
        <Route path="/admin/bill" element={<AdminDashboard />} />
        <Route path="/admin/reports" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
