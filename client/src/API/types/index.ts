import { AxiosError } from "axios"

export type MyAxiosErr = AxiosError<{ message: string }>


export interface Res<T> {
   data: T
}


export interface LoginInput {
   email: string,
   password: string
}

export interface RegisterInput {
   email: string,
   name: string,
   password: string,
   password2: string,
   location?: string
}

export interface IUser {
   name: string,
   email: string,
   location?: string,
   avatar: string,
   banner?: string,
   subscribersCount: number,
   isVerified: boolean,
   createdAt: string,
}