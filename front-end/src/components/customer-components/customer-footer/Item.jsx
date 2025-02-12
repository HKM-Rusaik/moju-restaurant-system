import React from "react";
const Item = ({Links, title}) => {
  return (
    <div>
      <ul>
        <h1 className="mb-1 font-semibold">{title}</h1>

        {
            Links.map((link) => (
                <li key={link.name}>
                    <a className="text-gray-400 hover:text-yellow-400 duration-300
                    text-sm cursor-pointer leading-6" href={link.link}>{link.name}</a>
                </li>
            ))
        }
      </ul>
    </div>
  );
};

export default Item;
