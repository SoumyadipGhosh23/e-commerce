import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payableAmount : 0,
  };

  export const amountSlice = createSlice({
    name : "amountpay",
    initialState,
    reducers : {
        setAmount : (state, action)=>{
            state.payableAmount = action.payload
        },
        resetAmount : (state)=>{
            state.payableAmount = 0
        }
    }
  })

  export const {setAmount, resetAmount} = amountSlice.actions;
  export default amountSlice.reducer