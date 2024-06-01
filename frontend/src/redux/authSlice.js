import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setStaus : (state)=>{
            state.status = true
        }
     }
})

export const {login, logout, setStaus} = authSlice.actions;

export default authSlice.reducer;