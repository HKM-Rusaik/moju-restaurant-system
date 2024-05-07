import React from "react";
import { useState } from "react";
import axios from "axios";
import { RiAdminLine } from "react-icons/ri";

const AdminWelcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const formData = { email: email, password: password };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here

    try {
      const response = await axios.post(
        "http://localhost:5000/staff/login",
        formData
      );
      console.log(response.data);

      alert(response.data.message);
    } catch (error) {
      console.log("Error when sign", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center text-[#ffda35] font-bold text-3xl mt-4 bg-[#2c2c2c] py-2">
        MOJU Restaurant <RiAdminLine />
      </div>
      <div>
        <div className="mt-10 flex justify-center font-semibold text-2xl">Sign in as Staff</div>
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
              <p>Forgot Password?</p>
            </div>

            <button
              type="button"
              className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Get Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
