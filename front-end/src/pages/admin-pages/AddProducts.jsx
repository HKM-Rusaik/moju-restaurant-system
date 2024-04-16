import Layout from "layouts/AdminLayouts";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("available");

  const itemStatus = availability === "available" ? true : false;

  const formData = {
    itemName: productName,
    itemPrice: price,
    itemPicURL: productImage,
    itemStatus: itemStatus,
    categoryId: selectedCategory,
  };

  // Fetch categories from the API
  useEffect(() => {
    // Replace 'API_ENDPOINT' with the actual endpoint URL
    axios
      .get("http://localhost:5000/admin/categories")
      .then((response) => {
        // Set the fetched categories to the state variable
        setCategories(response.data);

        setProductName("");
        setSelectedCategory("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.value === "available" ? true : false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleProductImageChange = (event) => {
    setProductImage(event.target.files[0]);
  };
  const getSelectClassName = () => {
    if (availability === "available") {
      return "bg-green-500"; // Green border for "Available"
    } else if (availability === "unavailable") {
      return "bg-red-500"; // Red border for "Unavailable"
    } else {
      return ""; // Default case, no additional class
    }
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form validation
    if (!productName || !selectedCategory || !price || !availability) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Make POST request to save the product data
      await axios.post("http://localhost:5000/admin/items", formData);
      alert("Product added successfully!");
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product. Please try again.");
    }
  };
  return (
    <Layout>
      <div className="p-2">
        <p className="text-2xl font-bold ">
          Products Management {">"} Add Product{" "}
        </p>

        <div className="">
          <form onSubmit={handleSubmit}>
            <table className="mt-8 ml-4">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="product-name">Product Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="productName"
                      placeholder="product name..."
                      id="product-name"
                      value={productName}
                      onChange={handleProductNameChange}
                      className="border rounded p-2 w-full"
                    />
                  </td>
                </tr>{" "}
                <br />
                <tr className="my-4">
                  <td>
                    <label htmlFor="category">Category</label>
                  </td>
                  <td>
                    <select
                      name="category"
                      id="category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="border rounded p-2 w-full"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.categoryName.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>{" "}
                <br />
                <tr className="my-4">
                  <td>
                    <label htmlFor="product-image">Photo</label>
                  </td>
                  <td>
                    <input
                      type="file"
                      name="productImage"
                      id="product-image"
                      onChange={handleProductImageChange}
                      className="border rounded p-2 w-full"
                    />
                  </td>
                </tr>
                <br />
                <tr className="my-4">
                  <td>
                    <label htmlFor="price">Price Rs.</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={price}
                      onChange={handlePriceChange}
                      placeholder="enter price..."
                      className="border rounded p-2 w-full"
                    />
                  </td>
                </tr>
                <br />
                <tr className="my-4">
                  <td>
                    <label htmlFor="status">Status</label>
                  </td>
                  <td>
                    <select
                      id="availability-select"
                      name="status"
                      value={availability}
                      onChange={handleAvailabilityChange}
                      className={`border rounded p-2 w-full ${getSelectClassName()}`}
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </td>
                </tr>
                <br />
              </tbody>
            </table>
            <div className="mt-4 ml-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddProducts;
