import React from "react";
import SignInForm from "components/customer-components/SignInForm";
import MojuFRontImage from "assets/Images/moju.jpg";
import DeliverImage from "assets/Images/delivery-boy-red-yellow.jpg";
import Layout from "layouts/CustomerLayout";

const Welcome = () => {
  return (
    <Layout>
      <div className="fade-enter-active">
        <div className="text-center p-1 mx-auto flex justify-end mt-5 ">
          <div className="border-black flex justify-around rounded border-2 ">
            <span className="bg-black text-white w-24 hover:cursor-pointer ">
              Sign in
            </span>{" "}
            <span className="bg-white w-24 hover:cursor-pointer">Register</span>
          </div>
        </div>
        <div className=" mt-10 text-center font-bold text-3xl text-black">
          Best Food Restaurant in Vavuniya
          <div className="mt-4 flex justify-center items-center">
            <div className="text-lg text-left mr-2">
              <span className="text-[#ff9f00] text-xl">MOJU Food:</span> <br />{" "}
              "Crafted with Care from Local Ingredients, <br />
              Delighting Your Taste Buds Every Bite!"
            </div>
            <img
              className="w-1/5 h-2/5 rounded shadow-2xl "
              src={MojuFRontImage}
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center mt-10 justify-center">
          <div className="bg-zinc-700 w-1/2  mr-10 pt-8 rounded drop-shadow-2xl shadow-2xl">
            <div className="w-64 bg-gray-400 mx-auto ordering font-bold rounded p-2 mb-6 text-2xl">
              <h2 className="text-center ">Start Ordering</h2>
            </div>
            <div className=" flex place-content-center text-white text-xl drop-shadow-2xl">
              <p className="border-r pr-4 border-white cursor-pointer text-blue-500 font-bold">
                Sign in
              </p>
              <p className="ml-4 cursor-pointer hover:text-blue-400">
                Guest Order
              </p>
            </div>
            <SignInForm />
          </div>
          <div className="">
            <img
              className="rounded-3xl food-image ml-2"
              src={DeliverImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
