import { rootApi } from ".";
import { PaginateRes, Res } from "./types";
import { IVideo, VideoInput } from "../types/video.types";

type SortTypes = 'date' | 'views'

interface VideosPaginateParams {
   search?: string,
   sort?: SortTypes,
   limit?: number,
   page?: number
}

interface VideosByUserPaginateParams {
   id: string,
   sort?: SortTypes,
   limit?: number,
   page?: number
}

interface PaginateData {
   data: IVideo[],
   hasMore: boolean,
   page: number
}

export class VideoApi {
   static fetchVideo = async (id: string): Promise<IVideo> => {
      const { data } = await rootApi.get<Res<IVideo>>(`/video/${id}`)
      return data.data
   }

   static fetchStudioVideos = async (): Promise<IVideo[]> => {
      const { data } = await rootApi.get<Res<IVideo[]>>(`/video/studio`)
      return data.data
   }

   static fetchSecureVideo = async (id: string): Promise<IVideo> => {
      const { data } = await rootApi.get<Res<IVideo>>(`/video/secure/${id}`)
      return data.data
   }

   static fetchVideos = async ({ search, sort = 'date', limit = 16, page = 1 }: VideosPaginateParams): Promise<PaginateData> => {
      const url = `/video?sort=${sort}${search ? `&search=${search}` : ''}&limit=${limit}&page=${page}`
      const { data } = await rootApi.get<PaginateRes<IVideo[]>>(url)
      return data.data
   }

   static fetchPopVideos = async (): Promise<IVideo[]> => {
      const { data } = await rootApi.get<Res<IVideo[]>>(`/video/popular`)
      return data.data
   }

   static createVideo = async (input: VideoInput): Promise<IVideo> => {
      const { data } = await rootApi.post<Res<IVideo>>(`/video/`, input)
      return data.data
   }

   static updateVideo = async (id: string, input: VideoInput): Promise<IVideo> => {
      const { data } = await rootApi.put<Res<IVideo>>(`/video/${id}`, input)
      return data.data
   }

   static updateLike = async (id: string): Promise<string> => {
      const { data } = await rootApi.put<Res<string>>(`/video/like/${id}`)
      return data.data
   }

   static updateDislike = async (id: string): Promise<string> => {
      const { data } = await rootApi.put<Res<string>>(`/video/dislike/${id}`)
      return data.data
   }

   static updateViews = async (id: string): Promise<number> => {
      const { data } = await rootApi.put<Res<number>>(`/video/views/${id}`)
      return data.data
   }

   static fetchVideosByUser = async ({ id, sort = 'date', limit = 16, page = 1 }: VideosByUserPaginateParams): Promise<PaginateData> => {
      const url = `/video/user/${id}?sort=${sort}&limit=${limit}&page=${page}`
      const { data } = await rootApi.get<PaginateRes<IVideo[]>>(url)
      return data.data
   }

   static deleteVideo = async (id: string): Promise<string> => {
      const { data } = await rootApi.delete<Res<string>>(`/video/${id}`)
      return data.data
   }
}