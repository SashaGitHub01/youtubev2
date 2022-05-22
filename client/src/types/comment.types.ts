import { IUser } from "./user.types";

export interface IComment {
   _id: string,
   user: IUser,
   text: string,
   video: string,
   createdAt: string
}

export interface CommentInput {
   text: string,
}