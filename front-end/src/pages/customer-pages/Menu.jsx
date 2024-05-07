import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryBox from "components/customer-components/CategoryBox";
import ItemBox from "components/customer-components/ItemBox";
import Cart from "components/customer-components/Cart";
import { Link } from "react-router-dom";
import Layout from "layouts/CustomerLayout";
import { IoSearchCircleSharp } from "react-icons/io5";
import DeliveryMessage from "components/customer-components/DeliveryMessage";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/categories")
      .then((response) => {
        setCategories(response.data);
        console.log("hello")
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const sortedCategories = categories.slice().sort((a, b) => {
    if (a.categoryName < b.categoryName) return -1;
    if (a.categoryName > b.categoryName) return 1;
    return 0;
  });

  return (
    <Layout>
      <div className="fade-enter-active">
        <Link to="/menu/cart">
          <Cart textColor="text-yellow-500" bgColor="bg-black" />
        </Link>
        <p className="antialiased text-center text-2xl font-bold mb-10">
          Menu Items
        </p>
        {/* <DeliveryMessage /> */}
        <div className="flex items-center justify-end mb-8">
          <IoSearchCircleSharp className="text-3xl text-yellow-500" />
          <input
            type="text"
            placeholder="Search by item name"
            value={searchText}
            onChange={handleSearchInputChange}
            className="px-3 py-2  border border-gray-500 rounded-md shadow focus:outline-none focus:border-yellow-500"
          />
        </div>
        {sortedCategories.map((category) => (
          <div key={category.categoryId}>
            <CategoryBox type={category.categoryName.toUpperCase()} />
            <div className="grid grid-cols-4 my-4">
              {filteredItems
                .filter((item) => item.categoryId === category.categoryId)
                .map((item) => (
                  <div key={item.itemId}>
                    <ItemBox
                      name={item.itemName}
                      price={item.itemPrice}
                      itemId={item.itemId}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Menu;
