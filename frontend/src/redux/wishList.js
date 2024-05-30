// wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.wishlist.push(action.payload);
      }
    },
    deleteWishlist: (state, action)=>{
      state.wishlist = state.wishlist.filter(
        (item)=> item._id !== action.payload
      );
    },

    resetWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, resetWishlist, deleteWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
