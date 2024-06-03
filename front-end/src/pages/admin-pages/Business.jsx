import React, { useState } from "react";
import Layout from "layouts/AdminLayouts";
import Bill from "../../components/admin-components/Bill";
import DateTimeDisplay from "components/admin-components/DateTime";
import Profit from "components/admin-components/Profit";

const Business = () => {
  const [isBill, setIsBill] = useState(true);
  const [isProfit, setIsProfit] = useState(false);

  const handleBill = () => {
    setIsBill(true);
    setIsProfit(false);
  };
  const handleProfit = () => {
    setIsBill(false);
    setIsProfit(true);
  };
  return (
    <Layout>
      <div className="m-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Business </h1>
        <DateTimeDisplay />
        <div className="flex justify-center space-x-4 mb-8">
          <div
            className={`w-[100px] p-4 cursor-pointer text-center text-white font-semibold rounded-md transition duration-300 ${
              isBill ? "bg-blue-600" : "bg-blue-400"
            }`}
            onClick={handleBill}
          >
            Bill
          </div>
          <div
            className={`w-[100px] p-4 cursor-pointer text-center text-white font-semibold rounded-md transition duration-300 ${
              isProfit ? "bg-blue-600" : "bg-blue-400"
            }`}
            onClick={handleProfit}
          >
            Summary
          </div>
        </div>

        {isBill && <Bill />}
        {isProfit && <Profit />}
      </div>
    </Layout>
  );
};

export default Business;
