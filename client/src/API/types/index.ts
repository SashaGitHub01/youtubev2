import { AxiosError } from "axios"

export type MyAxiosErr = AxiosError<{ message: string }>


export interface Res<T> {
   data: T
}

export interface IMediaRes {
   url: string,
   name: string
}