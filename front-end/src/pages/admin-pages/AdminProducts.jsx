import React, { useState, useEffect } from "react";
import Layout from "layouts/AdminLayouts";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingPopUp from "components/customer-components/LoadingPopUp";
import { MessageShowPopUp } from "components/customer-components/MessageShowPopUp";
const AdminProduct = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemPrice, setEditedItemPrice] = useState("");
  const [editedItemCategory, setEditedItemCategory] = useState("");
  const [editedItemStatus, setEditedItemStatus] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [searchText, setSearchText] = useState("");

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
    setDeleteLoading(true);
    try {
      await axios.delete(`http://localhost:5000/admin/items/${itemId}`);
      // Delay the state update and text change
      setTimeout(() => {
        // Remove the deleted item from the items state
        setItems(items.filter((item) => item.itemId !== itemId));
        setDeleteLoading(false);
        setDeleteSuccess(true);

        // Set a timeout to close the window after showing success message
        setTimeout(() => {
          setDeleteSuccess(false);
          // Close the window or navigate away, e.g., history.push('/somewhere')
          console.log("Item deleted successfully");
        }, 1200); // Show success message for 2 seconds
      }, 2000); // Initial delay (2 seconds)
    } catch (error) {
      setDeleteLoading(false);
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
    // Check if the price is greater than 0
    if (parseFloat(editedItemPrice) <= 0) {
      setPriceError("Price must be greater than 0");
      setShowMessageBox(true);
      console.error("Price must be greater than 0");
      return;
    }

    setEditLoading(true);
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
      // Delay the state update and text change
      setTimeout(() => {
        setItems(updatedItems);
        setEditItemId(null); // Reset editItemId
        setEditedItemName(""); // Reset editedItemName
        setEditedItemPrice(""); // Reset editedItemPrice
        setEditedItemCategory(""); // Reset editedItemCategory
        setEditedItemStatus(false); // Reset editedItemStatus
        setEditLoading(false);
        setEditSuccess(true);

        // Set a timeout to close the window after showing success message
        setTimeout(() => {
          setEditSuccess(false);
          console.log("Item edited successfully");
        }, 1200); // Show success message for 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const handleItemSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <div className="m-4">
        <p className="text-3xl font-bold text-black mb-6">
          Products Management
        </p>
        <div className="flex justify-around ml-[40%] mt-8">
          <div className="relative flex items-center w-80 border rounded-md bg-white shadow-md">
            <FaSearch className="text-gray-400 ml-2" />
            <input
              type="text"
              className="flex-grow p-2 pl-8 border-0 rounded"
              placeholder="Search by item name..."
              value={searchText}
              onChange={handleItemSearch}
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
              {filteredItems.map((item) => (
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
      {showMessageBox && (
        <MessageShowPopUp
          onClose={() => setShowMessageBox(false)}
          message={"Price is must be in a number that is greater than zero"}
        />
      )}
      {editLoading && (
        <LoadingPopUp text={"Item is being updated"} finishedLoad={false} />
      )}
      {editSuccess && (
        <LoadingPopUp
          text={"Item was updated successfully"}
          finishedLoad={true}
        />
      )}
      {deleteLoading && (
        <LoadingPopUp text={"Item is being deleted"} finishedLoad={false} />
      )}
      {deleteSuccess && (
        <LoadingPopUp
          text={"Item was deleted successfully"}
          finishedLoad={true}
        />
      )}
    </Layout>
  );
};

export default AdminProduct;
