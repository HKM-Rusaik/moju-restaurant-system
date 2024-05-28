import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemsPriceTotal: 0,
};

const cartItemSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.itemId === newItem.itemId
      );

      if (existingItemIndex !== -1) {
        // If item already exists, update quantity
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Otherwise, add new item
        state.cartItems.push(newItem);
      }
    },
    updateItemQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.itemId === itemId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    addItemsTotalPrice(state, action) {
      state.itemsPriceTotal = action.payload;
    },

    removeAllItems(state) {
      state.cartItems = [];
      state.itemsPriceTotal = 0;
    },
    removeItem(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.itemId !== itemId
      );
    },
  },
});

export const {
  addItem,
  updateItemQuantity,
  addItemsTotalPrice,
  removeAllItems,
  removeItem,
} = cartItemSlice.actions;
export default cartItemSlice.reducer;
