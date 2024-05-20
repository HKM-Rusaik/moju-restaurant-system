import React from "react";

function CategoryBox(props) {
  return (
    <div className="ml-20 font-bold text-white bg-gray-800 text-xl border-2 flex justify-center w-80 p-2 rounded-xl shadow-lg">
      {props.type}
    </div>
  );
}

export default CategoryBox;
