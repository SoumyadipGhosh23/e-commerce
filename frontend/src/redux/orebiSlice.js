import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.products.find(
        (item) => item._id === action.payload._id
      );
    
      if (existingItem) {
        // If the item already exists in the cart, check if adding more exceeds the limit
        if (existingItem.quantity + action.payload.quantity < existingItem.maxQunatity) {
          existingItem.quantity += action.payload.quantity;
        } else {
          // If adding more exceeds the limit, set the quantity to the maximum allowed
          existingItem.quantity = existingItem.maxQunatity;
        }
      } else {
        // If the item is not in the cart, check if adding it exceeds the limit
        if (action.payload.quantity < action.payload.maxQunatity) {
          state.products.push(action.payload);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity < item.maxQunatity) {
        
        item.quantity++;
        
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = orebiSlice.actions;
export default orebiSlice.reducer;
