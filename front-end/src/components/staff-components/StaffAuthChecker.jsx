import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { setStaffToken } from "slices/staffSlice";

const StaffAuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const staffToken = localStorage.getItem("staffToken");
      console.log("Admin token retrieved from localStorage:", staffToken); // Add logging
      if (staffToken) {
        dispatch(setStaffToken(staffToken));
      } else {
        navigate("/staff/login");
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default StaffAuthChecker;
