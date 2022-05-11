import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthApi } from "../../API/AuthApi";
import { LoginInput, RegisterInput } from "../../API/types";

export const fetchAuth = createAsyncThunk(
   'auth/fetchAuth',
   async (_, thunk) => {
      try {
         const res = await AuthApi.auth()
         return res
      } catch (err) {
         return thunk.rejectWithValue(err)
      }
   }
)

export const fetchLogin = createAsyncThunk(
   'auth/fetchAuth',
   async (input: LoginInput, thunk) => {
      try {
         const res = await AuthApi.login(input)
         return res
      } catch (err) {
         return thunk.rejectWithValue(err)
      }
   }
)

export const fetchRegister = createAsyncThunk(
   'auth/fetchAuth',
   async (input: RegisterInput, thunk) => {
      try {
         const res = await AuthApi.register(input)
         return res
      } catch (err) {
         return thunk.rejectWithValue(err)
      }
   }
)