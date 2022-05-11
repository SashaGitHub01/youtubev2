import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
   isFetching: true,
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: {

   }
})