import { rootApi } from ".";
import { CommentInput, IComment } from "../types/comment.types";
import { Res } from "./types";

export class CommentApi {
   static create = async (id: string, input: CommentInput): Promise<IComment> => {
      const { data } = await rootApi.post<Res<IComment>>(`/comment/${id}`, input)
      return data.data
   }

   static fetchByVideo = async (id: string): Promise<IComment[]> => {
      const { data } = await rootApi.get<Res<IComment[]>>(`/comment/${id}`)
      return data.data
   }

   static delete = async (id: string): Promise<string> => {
      const { data } = await rootApi.delete<Res<string>>(`/comment/${id}`)
      return data.data
   }
}