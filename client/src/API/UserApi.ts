import { rootApi } from ".";
import { Res } from "./types";
import { IUser, IUserInput } from "../types/user.types";


export class UserApi {
   static fetchUser = async (id: string): Promise<IUser> => {
      const { data } = await rootApi.get<Res<IUser>>(`/user/${id}`)
      return data.data
   }

   static fetchUsers = async (): Promise<IUser[]> => {
      const { data } = await rootApi.get<Res<IUser[]>>(`/user/`)
      return data.data
   }

   static fetchPopUsers = async (): Promise<IUser[]> => {
      const { data } = await rootApi.get<Res<IUser[]>>(`/user/popular`)
      return data.data
   }

   static updateUser = async (input: IUserInput): Promise<IUser> => {
      const { data } = await rootApi.put<Res<IUser>>(`/user/`, input)
      return data.data
   }
}