import { rootApi } from ".";
import { IUser, LoginInput, RegisterInput, } from "../types/user.types";
import { Res } from "./types";

export class AuthApi {
   static login = async (input: LoginInput): Promise<IUser> => {
      try {
         const { data } = await rootApi.post<Res<IUser>>('/user/login', input)

         return data.data
      } catch (err: any) {
         throw Error(err.response?.data?.message)
      }
   }

   static register = async (input: RegisterInput): Promise<IUser> => {
      try {
         const { data } = await rootApi.post<Res<IUser>>('/user/register', input)

         return data.data
      } catch (err: any) {
         throw Error(err.response?.data?.message)
      }
   }

   static auth = async (): Promise<IUser> => {
      try {
         const { data } = await rootApi.get<Res<IUser>>('/user/auth')

         return data.data
      } catch (err: any) {
         throw Error(err.response?.data?.message)
      }
   }

   static logout = async (): Promise<boolean> => {
      try {
         const { data } = await rootApi.get<boolean>('/user/logout')

         return data
      } catch (err: any) {
         throw Error(err.response?.data?.message)
      }
   }
}