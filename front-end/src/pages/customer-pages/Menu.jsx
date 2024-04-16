import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryBox from "components/customer-components/CategoryBox";
import ItemBox from "components/customer-components/ItemBox";
import Cart from "components/customer-components/Cart";
import { Link } from "react-router-dom";
import Layout from "layouts/CustomerLayout";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

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

  return (
    <Layout>
      <div className="fade-enter-active">
        <Link to="/menu/cart">
          <Cart textColor="text-yellow-500" bgColor="bg-black" />
        </Link>
        <p className="antialiased text-center text-2xl font-bold mb-10">
          Menu Items
        </p>
        {categories.map((category) => (
          <div key={category.categoryId}>
            <CategoryBox type={category.categoryName.toUpperCase()} />
            <div className="grid grid-cols-4 my-4">
              {items
                .filter((item) => item.categoryId === category.categoryId)
                .map((item) => (
                  <div key={item.itemId}>
                    <ItemBox name={item.itemName} price={item.itemPrice} />
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
