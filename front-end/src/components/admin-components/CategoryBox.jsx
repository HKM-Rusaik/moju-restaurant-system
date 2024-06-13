import React, { useState } from "react";
import axios from "axios";

const CategoryBox = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(props.name);

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:5000/admin/categories/${props.id}`);
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const updatedCategory = {
        id: props.id,
        categoryName: editedName,
      };

      await axios.patch(
        `http://localhost:5000/admin/categories/${props.id}`,
        updatedCategory
      );
      console.log("Category updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {editMode ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="bg-gray-100 p-2 rounded w-40"
        />
      ) : (
        <span className="bg-yellow-500 p-2 rounded font-bold w-40 text-center">
          {props.name}
        </span>
      )}
      {props.name !== "PROMOTION" && (
        <>
          {editMode ? (
            <button
              type="button"
              className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-blue-500 text-white p-1 w-24 rounded hover:bg-blue-600"
              onClick={handleEditCategory}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-green-500 text-white p-1 w-24 rounded hover:bg-green-600"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
          <button
            type="button"
            className="transition delay-150 duration-300 ease-in-out hover:scale-110 bg-red-500 text-white p-1 w-24 rounded hover:bg-red-600"
            onClick={handleDeleteCategory}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryBox;
