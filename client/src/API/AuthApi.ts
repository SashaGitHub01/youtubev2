import { rootApi } from ".";
import { IUser, LoginInput, RegisterInput, Res } from "./types";

export class AuthApi {
   static login = async (input: LoginInput): Promise<IUser> => {
      const { data } = await rootApi.post<Res<IUser>>('/user/login', input)

      return data.data
   }

   static register = async (input: RegisterInput): Promise<IUser> => {
      const { data } = await rootApi.post<Res<IUser>>('/user/register', input)

      return data.data
   }

   static auth = async (): Promise<IUser> => {
      const { data } = await rootApi.get<Res<IUser>>('/user/auth')

      return data.data
   }

   static logout = async (): Promise<boolean> => {
      const { data } = await rootApi.get<boolean>('/user/logout')

      return data
   }
}