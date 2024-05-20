import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toPascalCase } from "utils.js";

const ItemList = ({ orderId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/customer/order/${orderId}/items`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItems();
  }, [orderId]);
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.itemId}>
            {toPascalCase(item.item.itemName)} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
