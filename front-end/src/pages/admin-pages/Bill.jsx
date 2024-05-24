import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import axios from "axios.js";
import ItemList from "components/customer-components/ItemList";
import { FaLink } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Bill = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await axios.get("/staff/orders");
      setAllOrders(response.data);
    };

    getAllOrders();
  }, []);

  const filteredOrders = allOrders.filter(
    (order) =>
      order.orderId.toString().includes(searchTerm) ||
      order["customer.firstName"]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order["customer.lastName"]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="text-2xl font-bold m-4">Orders Management</div>
      <div className="flex items-center justify-end mb-4 mr-8">
        <FaSearch className="text-green-500 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          className="border shadow-xl rounded py-2 px-4 w-[30%]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-[95%] mx-auto mt-8 border-collapse rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-800 px-4 py-2">Order ID</th>
              <th className="border border-gray-800 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-gray-800 px-4 py-2">
                Order Details
              </th>
              <th className="border border-gray-800 px-4 py-2">
                Payment Method
              </th>
              <th className="border border-gray-800 px-4 py-2">Order Type</th>
              <th className="border border-gray-800 px-4 py-2">
                Delivery Address
              </th>
              <th className="border border-gray-800 px-4 py-2">Order Status</th>
              <th className="border border-gray-800 px-4 py-2">Bill</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-500">
                <td className="text-center py-3">{order.orderId}</td>
                <td className="text-center py-3">
                  {`${order["customer.firstName"]} ${order["customer.lastName"]}`}
                </td>
                <td className="text-center py-3">
                  <ItemList orderId={order.orderId} />
                </td>
                <td className="text-center py-3">{order.paymentMethod}</td>
                <td className="text-center py-3">{order.orderType}</td>
                <td className="text-center py-3">{order.deliveryAddress}</td>
                <td className="text-center py-3">{order.orderStatus}</td>
                <td className="text-center py-3">
                  <a
                    href={order.billUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaLink className="text-center mx-auto" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Bill;
