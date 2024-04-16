import React from "react";
import { useState, useEffect } from "react";
import Layout from "layouts/AdminLayouts";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminProduct = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <Layout>
      <div className="p-2">
        <p className="text-2xl font-bold">Products Management</p>

        <div className="flex justify-around ml-[40%] mt-8">
          <div className="relative flex items-center w-80 border rounded-md bg-white shadow-md">
            <FaSearch className="text-gray-400 ml-2" />
            <input
              type="text"
              className="flex-grow p-2 pl-8 border-0 rounded"
              placeholder="Search..."
            />
          </div>
          <div>
            <Link to="/admin/products/add-products">
              <button className="bg-green-500 text-white p-2 flex items-center rounded">
                <IoMdAdd /> Add Product
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <table className="w-full border-collapse">
            <thead className="shadow-md">
              <tr className="bg-gray-100">
                <th className="p-2 border text-center">Product Code</th>
                <th className="p-2 border text-center">Photo</th>
                <th className="p-2 border text-center">Name</th>
                <th className="p-2 border text-center">Category</th>
                <th className="p-2 border text-center">Price</th>
                <th className="p-2 border text-center">Status</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.itemId} className="border-t">
                  <td className="p-2 border text-center align-middle">
                    {item.itemId}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    <img
                      src={item.itemPicURL} // Updated prop name for photo URL
                      alt={item.itemName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {item.itemName}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {item.category.categoryName} {/* Display category name */}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {item.itemPrice}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {item.itemStatus ? "Available" : "Unavailable"}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    <button className="bg-blue-500 text-white p-2 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white p-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProduct;
