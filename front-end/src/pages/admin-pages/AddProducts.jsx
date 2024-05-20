import Layout from "layouts/AdminLayouts";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { storage } from "firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import getDownloadURL
import { v4 } from "uuid";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("available");
  const [imageURL, setImageURL] = useState(""); // State to store image URL
  const [description, setDescription] = useState(""); // New state for description

  // const formData = {
  //   itemName: productName,
  //   itemPrice: price,
  //   itemPicURL: imageURL,
  //   itemStatus: availability === "available",
  //   categoryId: selectedCategory,
  //   itemDescription: description,
  // };

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
    setAvailability(event.target.value);
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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const getSelectClassName = () => {
    if (availability === "available") {
      return "bg-green-500";
    } else if (availability === "unavailable") {
      return "bg-red-500";
    } else {
      return "";
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

    if (productImage == null) return;

    const imageRef = ref(storage, `images/${productImage.name + v4()}`);

    try {
      await uploadBytes(imageRef, productImage);

      // Once uploaded, get the download URL
      const url = await getDownloadURL(imageRef);

      // Set the URL to state
      setImageURL(url);

      // Now you can proceed with form submission using the updated imageURL
      const formData = {
        itemName: productName,
        itemPrice: price,
        itemPicURL: url, // Use the URL obtained from Firebase
        itemStatus: availability === "available",
        categoryId: selectedCategory,
        itemDescription: description,
      };

      await axios.post("http://localhost:5000/admin/items", formData);

      alert("Product added successfully!");

      // Reset form fields
      setProductName("");
      setSelectedCategory("");
      setProductImage(null);
      setPrice("");
      setAvailability("available");
      setImageURL("");
      setDescription("");
    } catch (error) {
      console.error("Error during image upload or product save:", error);
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
                    <label htmlFor="product-name">
                      Product Name <span className="text-red-500">*</span>
                    </label>
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
                <tr>
                  <td>
                    <label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </label>
                  </td>
                  <td>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Enter description..."
                      value={description}
                      onChange={handleDescriptionChange}
                      className="border rounded p-2 w-full"
                    />
                  </td>
                </tr>
                <br />
                <tr className="my-4">
                  <td>
                    <label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </label>
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
                        Select a category{" "}
                        <span className="text-red-500">*</span>
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
                    <label htmlFor="product-image">
                      Photo <span className="text-red-500">*</span>
                    </label>
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
                    <label htmlFor="price">
                      Price Rs. <span className="text-red-500">*</span>
                    </label>
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
                    <label htmlFor="status">
                      Status <span className="text-red-500">*</span>
                    </label>
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
                className="bg-green-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
