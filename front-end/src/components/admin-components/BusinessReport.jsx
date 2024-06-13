import React, { useEffect, useState } from "react";
import { BusinessBarChart, OrderTypePieChart } from "./BusinessChart";
import axios from "axios.js";
import { toPascalCase } from "utils";

const BusinessReport = ({ duration }) => {
  const [ordersByType, setOrdersByType] = useState([]);
  const [dailyOrdersTotals, setDailyOrdersTotals] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedDuration = toPascalCase(duration);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          ordersByTypeResponse,
          dailyOrdersTotalsResponse,
          soldItemsResponse,
        ] = await Promise.all([
          axios.get(`/admin/order-count-by-type/${duration}`),
          axios.get(`/admin/total-orders/${duration}`),
          axios.get(`/admin/orders/sold-items/${duration}`),
        ]);
        setOrdersByType(ordersByTypeResponse.data);
        setDailyOrdersTotals(dailyOrdersTotalsResponse.data);
        setSoldItems(soldItemsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [duration]);

  // Parse totalQuantity to numbers
  soldItems.forEach((item) => {
    item.totalQuantity = parseInt(item.totalQuantity, 10);
  });

  // Find the item with the maximum totalQuantity
  let maxItem = soldItems.length > 0 ? soldItems[0] : {};
  maxItem = soldItems.reduce((prev, current) => {
    return prev.totalQuantity > current.totalQuantity ? prev : current;
  }, maxItem);
  console.log(maxItem);

  // Find the item with the minimum totalQuantity
  let minItem = soldItems.length > 0 ? soldItems[0] : {};
  minItem = soldItems.reduce((prev, current) => {
    return prev.totalQuantity < current.totalQuantity ? prev : current;
  }, minItem);

  let maxAmount = 0;
  let maxDate = "";
  let minAmount = Infinity;
  let minDate = "";
  let totalAmount = 0;
  let totalDays = dailyOrdersTotals.length;
  let avgAmount = 0;

  const sortedOrders = [...dailyOrdersTotals].sort(
    (a, b) => parseFloat(b.totalOrderAmount) - parseFloat(a.totalOrderAmount)
  );
  const top3Highest = sortedOrders.slice(0, 3);
  const top3Lowest = sortedOrders.slice(-3).reverse();

  for (const order of dailyOrdersTotals) {
    const amount = parseFloat(order.totalOrderAmount);
    totalAmount += amount;
    if (amount > maxAmount) {
      maxAmount = amount;
      maxDate = order.orderDate;
    }
    if (amount < minAmount) {
      minAmount = amount;
      minDate = order.orderDate;
    }
  }

  if (totalDays > 0) {
    avgAmount = totalAmount / totalDays;
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const orderCountsArray = Object.keys(ordersByType).map((orderType) => ({
    name: orderType,
    value: ordersByType[orderType],
  }));

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg">
      <div className="font-bold text-center text-2xl mb-6">
        {formattedDuration} Business Report
      </div>
      <BusinessBarChart duration={duration} />
      <div className="mt-6">
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>
            The bar chart above shows the daily sales amounts during {duration}.
          </li>
          <li>
            You made a total business of{" "}
            <span className="font-bold">Rs. {totalAmount.toFixed(2)}</span>{" "}
            during this {duration}.
          </li>
          <li>
            The highest sales were made on{" "}
            <span className="font-bold">{maxDate}</span> with a total of{" "}
            <span className="font-bold">Rs. {maxAmount.toFixed(2)}</span>.
          </li>
          <li>
            The lowest sales were made on{" "}
            <span className="font-bold">{minDate}</span> with a total of{" "}
            <span className="font-bold">Rs. {minAmount.toFixed(2)}</span>.
          </li>
          <li>
            The average daily sales amount is{" "}
            <span className="font-bold">Rs. {avgAmount.toFixed(2)}</span>.
          </li>
        </ul>
        <div className="mt-6 flex space-x-6">
          <div>
            <div className="mt-4">
              <div className="font-bold mb-2">Top 3 Highest Sales Days:</div>
              <ul className="list-decimal list-inside">
                {top3Highest.map((order) => (
                  <li key={order.orderDate}>
                    {order.orderDate}: Rs.{" "}
                    {parseFloat(order.totalOrderAmount).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <div className="font-bold mb-2">Top 3 Lowest Sales Days:</div>
              <ul className="list-decimal list-inside">
                {top3Lowest.map((order) => (
                  <li key={order.orderDate}>
                    {order.orderDate}: Rs.{" "}
                    {parseFloat(order.totalOrderAmount).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <OrderTypePieChart duration={duration} />
            <div className="mt-4">
              <div className="font-bold">Order Types Distribution:</div>
              <ul className="list-disc list-inside">
                {orderCountsArray.map((orderType) => (
                  <li key={orderType.name}>
                    {orderType.name}: {orderType.value} orders
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-green-600 rounded-lg">
          <div>
            Most Sales Item is{" "}
            <span className="font-bold">{maxItem.itemName}</span> with{" "}
            <span className="font-bold">{maxItem.totalQuantity}</span>
          </div>
          <div>
            Least Sales Item is{" "}
            <span className="font-bold">{minItem.itemName}</span> with{" "}
            <span className="font-bold">{minItem.totalQuantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessReport;
