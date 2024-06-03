import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryBox from "components/customer-components/CategoryBox";
import { useSelector } from "react-redux";
import ItemBox from "components/customer-components/ItemBox";
import Cart from "components/customer-components/Cart";
import { useNavigate } from "react-router-dom";
import Layout from "layouts/CustomerLayout";
import { IoSearchCircleSharp } from "react-icons/io5";
import Marquee from "react-fast-marquee";
import { FaRegHandPointRight } from "react-icons/fa";
import MembershipPopup from "components/customer-components/MemebrshipPopUp";
import { FaChevronCircleRight } from "react-icons/fa";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [viewPromotions, setViewPromotions] = useState(false);
  const [showMembershipPopup, setShowMembershipPopup] = useState(false); // State to control the display of membership pop-up
  const selectedItems = useSelector((state) => state.selectedItems.cartItems);
  const navigate = useNavigate();

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
        console.log(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.itemStatus &&
      item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(filteredItems);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCartClick = () => {
    if (selectedItems.length > 0) {
      navigate("cart");
    } else {
      alert("Please add items to proceed.");
    }
  };

  const handlePromotionsClick = () => {
    setViewPromotions(true);
  };

  const handleBackClick = () => {
    setViewPromotions(false);
  };

  const handleMembershipClick = () => {
    setShowMembershipPopup(true); // Show membership pop-up when clicked
  };

  const sortedCategories = categories.slice().sort((a, b) => {
    if (a.categoryName < b.categoryName) return -1;
    if (a.categoryName > b.categoryName) return 1;
    return 0;
  });

  // Filter categories for the main menu and promotions
  const mainMenuCategories = sortedCategories.filter(
    (category) => category.categoryName.toUpperCase() !== "PROMOTION"
  );

  const promotionalItems = filteredItems.filter((item) => item.isPromotional);
  const promotionCategory = sortedCategories.find(
    (category) => category.categoryName.toUpperCase() === "PROMOTION"
  );

  return (
    <Layout>
      <div className="fade-enter-active">
        <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
          <Cart textColor="text-yellow-500" bgColor="bg-black" />
        </div>
        {showMembershipPopup && (
          <MembershipPopup onClose={() => setShowMembershipPopup(false)} />
        )}{" "}
        <p className="antialiased text-center text-2xl font-bold mb-4">
          {viewPromotions ? "Promotional Items" : "Menu Items"}
        </p>
        <div className="flex items-center justify-end mt-8">
          <FaChevronCircleRight />
          <p
            className="bg-black inline rounded text-white p-2 text-end cursor-pointer"
            onClick={handleMembershipClick}
          >
            About Membership
          </p>
        </div>
        <Marquee>
          <div className=" text-red-500 p-2 rounded">
            Hello! Foodies, Make order on or above Rs.4000 and get free home
            delivery::{" "}
            <span className="bg-yellow-400 text-black px-2 rounded">
              5% off to Silver Members | 10% off to Golden Members | 20% off to
              Platenium Members
            </span>
          </div>
        </Marquee>
        <div className="flex items-center justify-between mb-2">
          <div>
            {viewPromotions ? (
              <button
                onClick={handleBackClick}
                className="mt-4 text-black font-bold cursor-pointer hover:text-white active:text-black flex items-center w-fit p-2 rounded"
              >
                <FaRegHandPointRight className="text-red-500 mr-2" />
                BACK TO MENU
              </button>
            ) : (
              <button
                onClick={handlePromotionsClick}
                className="mt-4 text-red-500 font-bold cursor-pointer hover:text-white active:text-black flex items-center w-fit p-2 rounded"
              >
                <FaRegHandPointRight className="text-red-500 mr-2" /> PROMOTIONS
                🎉
              </button>
            )}
          </div>
          <div className="flex items-center justify-end my-8">
            <IoSearchCircleSharp className="text-3xl text-yellow-500" />
            <input
              type="text"
              placeholder="Search by item name"
              value={searchText}
              onChange={handleSearchInputChange}
              className="px-3 py-2  border border-gray-500 rounded-md shadow focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
        {viewPromotions ? (
          <div>
            {promotionCategory && (
              <div>
                <CategoryBox
                  type={promotionCategory.categoryName.toUpperCase()}
                />
                <div className="grid grid-cols-4 my-4">
                  {filteredItems
                    .filter(
                      (item) => item.categoryId === promotionCategory.categoryId
                    )
                    .map((item) => (
                      <div key={item.itemId}>
                        <ItemBox
                          name={item.itemName}
                          price={item.itemPrice}
                          itemId={item.itemId}
                          itemImage={item.itemPicURL}
                          itemDescription={item.itemDescription}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 my-4">
              {promotionalItems.map((item) => (
                <div key={item.itemId}>
                  <ItemBox
                    name={item.itemName}
                    price={item.itemPrice}
                    itemId={item.itemId}
                    itemImage={item.itemPicURL}
                    itemDescription={item.itemDescription}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          mainMenuCategories.map((category) => (
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
                        itemImage={item.itemPicURL}
                        itemDescription={item.itemDescription}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Menu;
