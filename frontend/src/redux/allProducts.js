import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    imageArray: []
};

export const allProducts = createSlice({
    name: "allProducts",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setImageArray: (state, { payload }) => {
            state.imageArray = payload
        }

    }
})

export const { setProducts, setImageArray } = allProducts.actions;
export default allProducts.reducer