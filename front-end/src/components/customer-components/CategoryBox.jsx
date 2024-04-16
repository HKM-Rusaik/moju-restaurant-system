import React from "react";

function CategoryBox(props) {
  return (
    <div className="ml-20 font-bold text-yellow-950 text-xl border-2 flex justify-start w-80 p-2 rounded-xl cursor-pointer shadow-lg hover:bg-gray-400 active:bg-gray-500">
      {props.type}
    </div>
  );
}

export default CategoryBox;
