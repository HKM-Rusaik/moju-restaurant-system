import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { setAdminToken } from "slices/adminSlice";

const AdminAuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminToken = localStorage.getItem("adminToken");
      console.log("Admin token retrieved from localStorage:", adminToken); // Add logging
      if (adminToken) {
        dispatch(setAdminToken(adminToken));
      } else {
        navigate("/admin");
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default AdminAuthChecker;
