import { IUser } from "./user.types";

export interface IVideo {
   _id: string,
   name: string,
   isPublic: boolean,
   views: number,
   likes: number,
   dislikes: number,
   description: string,
   video: string,
   preview: string,
   createdAt: string,
   user: IUser,
   commentsCount?: number
}

export interface VideoInput {
   name?: string,
   isPublic?: boolean,
   description?: string,
   video?: string,
   preview?: string,
}