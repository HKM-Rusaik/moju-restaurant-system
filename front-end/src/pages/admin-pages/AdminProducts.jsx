import React, { useState, useEffect } from "react";
import Layout from "layouts/AdminLayouts";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminProduct = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemPrice, setEditedItemPrice] = useState("");
  const [editedItemCategory, setEditedItemCategory] = useState("");
  const [editedItemStatus, setEditedItemStatus] = useState(false);

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fetch categories from the API
  useEffect(() => {
    // Replace 'API_ENDPOINT' with the actual endpoint URL
    axios
      .get("http://localhost:5000/admin/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/items/${itemId}`);
      // Remove the deleted item from the items state
      setItems(items.filter((item) => item.itemId !== itemId));
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (
    itemId,
    itemName,
    itemPrice,
    itemCategory,
    itemStatus
  ) => {
    setEditItemId(itemId);
    setEditedItemName(itemName);
    setEditedItemPrice(itemPrice);
    setEditedItemCategory(itemCategory);
    setEditedItemStatus(itemStatus);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/admin/items/${editItemId}`, {
        itemName: editedItemName,
        itemPrice: editedItemPrice,
        categoryId: editedItemCategory,
        itemStatus: editedItemStatus,
      });
      // Update items state after successful edit
      const updatedItems = items.map((item) => {
        if (item.itemId === editItemId) {
          return {
            ...item,
            itemName: editedItemName,
            itemPrice: editedItemPrice,
            categoryId: editedItemCategory,
            itemStatus: editedItemStatus,
          };
        }
        return item;
      });
      setItems(updatedItems);
      setEditItemId(null); // Reset editItemId
      setEditedItemName(""); // Reset editedItemName
      setEditedItemPrice(""); // Reset editedItemPrice
      setEditedItemCategory(""); // Reset editedItemCategory
      setEditedItemStatus(false); // Reset editedItemStatus
      console.log("Item edited successfully");
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

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
                      src={item.itemPicURL}
                      alt={item.itemName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {editItemId === item.itemId ? (
                      <input
                        type="text"
                        value={editedItemName}
                        onChange={(e) => setEditedItemName(e.target.value)}
                        className="border rounded p-2 w-full"
                      />
                    ) : (
                      item.itemName
                    )}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {editItemId === item.itemId ? (
                      <select
                        value={editedItemCategory}
                        onChange={(e) => setEditedItemCategory(e.target.value)}
                        className="border rounded p-2 w-full"
                      >
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryName.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item.category.categoryName
                    )}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {editItemId === item.itemId ? (
                      <input
                        type="number"
                        value={editedItemPrice}
                        onChange={(e) => setEditedItemPrice(e.target.value)}
                        className="border rounded p-2 w-full"
                      />
                    ) : (
                      item.itemPrice
                    )}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {editItemId === item.itemId ? (
                      <select
                        value={editedItemStatus}
                        onChange={(e) => setEditedItemStatus(e.target.value)}
                        className="border rounded p-2 w-full"
                      >
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                      </select>
                    ) : item.itemStatus ? (
                      "Available"
                    ) : (
                      "Unavailable"
                    )}
                  </td>
                  <td className="p-2 border text-center align-middle">
                    {editItemId === item.itemId ? (
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEdit(
                            item.itemId,
                            item.itemName,
                            item.itemPrice,
                            item.categoryId,
                            item.itemStatus
                          )
                        }
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => deleteItem(item.itemId)}
                    >
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
