import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCustomer, setToken } from "slices/customerSlice";
import { useDispatch } from "react-redux";
import axios from "axios.js";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const formData = { email: email, password: password };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/customer/login", formData);
      localStorage.setItem("token", response.data.token);
      dispatch(setToken(response.data.token));
      dispatch(setCustomer(response.data.customer));

      setSuccessMessage(response.data.message);
      setLoading(false);

      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/account/registration");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded bg-white">
      <form onSubmit={handleSignIn}>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-500 text-center">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2 rounded"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 mb-2"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10V0C4.477 0 0 4.477 0 10h2z"
                ></path>
              </svg>
              Logging in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
        <hr className="mb-2 border-t-2 mt-2 border-gray-800" />
        <div>
          <p className="font-bold">Do not have an account?</p>
        </div>
        <button
          type="button"
          className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
