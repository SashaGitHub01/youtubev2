import { rootApi } from ".";
import { IMediaRes, Res } from "./types";

export class MediaApi {
   static uploadVideo = async (body: FormData) => {
      const { data } = await rootApi.post<Res<IMediaRes>>('/media/video', body, {
         headers: {
            'Content-Type': "multipart/form-data"
         }
      })
      return data.data
   }

   static uploadPreview = async (body: FormData) => {
      const { data } = await rootApi.post<Res<IMediaRes>>('/media/previews', body, {
         headers: {
            'Content-Type': "multipart/form-data"
         }
      })
      return data.data
   }

   static uploadAatar = async (body: FormData) => {
      const { data } = await rootApi.post<Res<IMediaRes>>('/media/avatars', body, {
         headers: {
            'Content-Type': "multipart/form-data"
         }
      })
      return data.data
   }
}
