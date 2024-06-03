import React, { useState, useEffect } from "react";
import Calculator from "components/Caculator";
import axios from "axios.js";

const Profit = () => {
  const [isTodaySummary, setIsTodaySummary] = useState(false);
  const [isProfitList, setIsProfitList] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });
  const [todayOrders, setTodayOrders] = useState([]);
  const [dailySummary, setDailySummary] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState(null);

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString(undefined, options);
      const formattedTime = today.toLocaleTimeString();
      setCurrentDateTime({ date: formattedDate, time: formattedTime });
    };

    // Update the date and time immediately
    updateDateTime();
  }, []);

  useEffect(() => {
    const getTodayOrdes = async () => {
      const today = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const response = await axios.get(`/admin/orders/day/${today}`);
      setTodayOrders(response.data);
    };
    getTodayOrdes();
  }, []);

  console.log(todayOrders);

  const handleSummaryClick = () => {
    setIsTodaySummary(true);
    setIsProfitList(false);
  };

  const todayBusiness = todayOrders.reduce(
    (total, order) => total + order.orderTotal,
    0
  );

  const handleTodayBusinessSubmit = async (e) => {
    e.preventDefault();

    try {
      const reponse = await axios.post("/admin/orders/today/summary", {
        date: new Date().toISOString().split("T")[0],
        businessTotal: todayBusiness,
        expenses: todayExpenses,
      });

      setTodayExpenses("");
      setIsProfitList(true);
      setIsTodaySummary(false);
    } catch (err) {
      console.log("error in submitting summarry");
    }
  };

  useEffect(() => {
    const getDailySummary = async () => {
      const response = await axios.get("/admin/orders/daily-summary");
      setDailySummary(response.data);
    };
    getDailySummary();
  }, []);

  console.log(dailySummary);

  return (
    <div className="p-4">
      <div className="text-2xl text-center font-bold mb-6">
        Daily Profits Summary
      </div>
      <div className="flex items-center justify-end mr-16 mb-4">
        <button
          onClick={handleSummaryClick}
          className={`bg-blue-500 ${
            isTodaySummary ? "bg-blue-700" : ""
          } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          + Today Summary
        </button>
      </div>
      {isProfitList && (
        <div className="overflow-x-auto">
          <table className="w-[95%] mx-auto mt-8 border-collapse rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-800 px-4 py-2">Date</th>
                <th className="border border-gray-800 px-4 py-2">
                  Business Amount
                </th>
                <th className="border border-gray-800 px-4 py-2">Expenses</th>
                <th className="border border-gray-800 px-4 py-2">Profits</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailySummary.map((summary) => (
                <tr key={summary.date}>
                  <td className="text-center py-3">{summary.date}</td>
                  <td className="text-center py-3">{summary.businessTotal}</td>
                  <td className="text-center py-3">{summary.expenses}</td>
                  <td className="text-center py-3">
                    {summary.businessTotal - summary.expenses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isTodaySummary && (
        <div className="flex items-start">
          <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
            <form onSubmit={handleTodayBusinessSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="today-date"
                  className="block text-lg font-medium text-gray-700"
                >
                  Today Date
                </label>
                <div>
                  <div>
                    <span className="font-bold text-green-600">
                      {currentDateTime.date}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="business-amount"
                  className="block text-lg font-medium text-gray-700"
                >
                  Today your total business amount:
                </label>
                <input
                  type="text"
                  id="business-amount"
                  readOnly
                  value={todayBusiness}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="expenses"
                  className="block text-lg font-medium text-gray-700"
                >
                  Enter your all expenses today:
                </label>
                <input
                  type="number"
                  id="expenses"
                  onChange={(e) => setTodayExpenses(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Finish Summary Today
                </button>
              </div>
            </form>
          </div>
          <Calculator />
        </div>
      )}
    </div>
  );
};

export default Profit;
