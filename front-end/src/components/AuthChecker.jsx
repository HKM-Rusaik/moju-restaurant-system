import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios.js";
import { setCustomer, setToken } from "slices/customerSlice";

const AuthChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        try {
          const response = await axios.get("customer/me", {
            headers: {
              "x-auth-token": token,
            },
          });
          dispatch(setCustomer(response.data.customer));
          dispatch(setToken(token));
        } catch (error) {
          console.error("Error fetching customer:", error);
          localStorage.removeItem("token");
          navigate("/account");
        }
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default AuthChecker;
