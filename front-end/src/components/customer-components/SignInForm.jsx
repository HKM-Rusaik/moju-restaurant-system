// import axios from "axios";
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
  const navigate = useNavigate();
  const formData = { email: email, password: password };

  console.log(axios);

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here

    try {
      const response = await axios.post("/customer/login", formData);
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      dispatch(setToken(response.data.token));
      dispatch(setCustomer(response.data.customer));

      alert(response.data.message); 

      navigate("/menu");
    } catch (error) {
      console.log("Error when sign", error);
    }
  };

  const handleRegister = () => {
    // Add your registration logic here
    console.log("Redirecting to registration page...");
    navigate("/account/registration");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded bg-white">
      <form onSubmit={handleSignIn}>
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
        >
          Sign In
        </button>
        <hr className="mb-2 border-t-2 mt-2 border-gray-800" />
        <div>
          <p>Do not have an account?</p>
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
