import React, { useEffect, useState } from "react";
import Layout from "layouts/AdminLayouts";
import { IoPlayForwardCircleSharp } from "react-icons/io5";
import CategoryBox from "components/admin-components/CategoryBox";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";

const ProductsCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const formData = { categoryName: categoryName };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Category Name:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/categories",
        formData
      );

      setCategoryName("");
    } catch (error) {
      console.log("Error when sign", error);
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex font-bold text-3xl ml-4 mb-8">
          Products Category Management
        </div>
        <div className="flex items-center text-xl mt-4">
          <div className="ml-4 font-semibold mr-2">Available Categories</div>
          <IoPlayForwardCircleSharp />
          <IoPlayForwardCircleSharp />
        </div>
        <div className="ml-8 mt-4">
          {categories.map((category) => (
            <div key={category.categoryId} className="mb-2">
              <CategoryBox
                id={category.categoryId}
                name={category.categoryName.toUpperCase()}
              />
            </div>
          ))}
        </div>
        <div className="ml-8 mt-8">
          <div className="flex items-center text-xl font-semibold">
            Add Category
            <IoIosAddCircle />
          </div>

          {/* Form for adding a new category */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
              placeholder="Enter category name"
              className="border border-gray-300 rounded-md p-2 mt-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 mt-2 ml-2"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsCategory;
