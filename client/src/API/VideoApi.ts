import { rootApi } from ".";
import { Res } from "./types";
import { IVideo, VideoInput } from "../types/video.types";

type SortTypes = 'date' | 'views'

export class VideoApi {
   static fetchVideo = async (id: string): Promise<IVideo> => {
      const { data } = await rootApi.get<Res<IVideo>>(`/video/${id}`)
      return data.data
   }

   static fetchSecureVideo = async (id: string): Promise<IVideo> => {
      const { data } = await rootApi.get<Res<IVideo>>(`/video/secure/${id}`)
      return data.data
   }

   static fetchVideos = async (search?: string, sort: SortTypes = 'date'): Promise<IVideo[]> => {
      const url = `/video?sort=${sort}${search ? `&search=${search}` : ''}`
      const { data } = await rootApi.get<Res<IVideo[]>>(url)
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

   static fetchVideosByUser = async (id: string, sort: SortTypes = 'date'): Promise<IVideo[]> => {
      const url = `/video/user/${id}?sort=${sort}`
      const { data } = await rootApi.get<Res<IVideo[]>>(url)
      return data.data
   }

   static deleteVideo = async (id: string): Promise<string> => {
      const { data } = await rootApi.delete<Res<string>>(`/video/${id}`)
      return data.data
   }
}