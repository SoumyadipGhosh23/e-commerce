import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category : "",
    color : ""
  };

  export const filteringSlice = createSlice({
    name : "amountpay",
    initialState,
    reducers : {
       setCategory : (state, {payload})=>{
        state.category = payload
       },
       setColor : (state, {payload})=>{
        state.color = payload
       }
    }
  })

  export const {setCategory, setColor} = filteringSlice.actions;
  export default filteringSlice.reducer