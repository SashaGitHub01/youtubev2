import { AxiosError } from "axios"

export type MyAxiosErr = AxiosError<{ message: string }>


export interface Res<T> {
   data: T
}

export interface PaginateRes<T> {
   data: {
      data: T,
      hasMore: boolean,
      page: number
   },
}

export interface IMediaRes {
   url: string,
   name: string
}

