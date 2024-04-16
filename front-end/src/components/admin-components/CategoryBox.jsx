import React from "react";
import axios from "axios";

const CategoryBox = (props) => {
  const handleDeleteCategory = async () => {
    try {

      await axios.delete(`http://localhost:5000/admin/categories/${props.id}`);
      // Optionally, you can perform some action after successful deletion, like updating the UI
      console.log("Category deleted successfully");
    } catch (error) {
      // Handle errors if any
      console.error("Error deleting category: ", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="bg-yellow-500 p-2 rounded font-bold w-40 text-center">
        {props.name}
      </span>
      <button
        type="button"
        className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-green-500 text-white p-1 w-24 rounded hover:bg-green-600"
      >
        Edit
      </button>
      <button
        type="button"
        className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-red-500 text-white p-1 w-24 rounded hover:bg-red-600"
        onClick={handleDeleteCategory}
      >
        Delete
      </button>
    </div>
  );
};

export default CategoryBox;
