import { Schema, model, Document, } from "mongoose";

export interface VideoModelI extends Document {
   name: string,
   isPublic: boolean,
   views: number,
   likes?: number,
   dislikes?: number,
   description: string,
   video?: string,
   preview?: string,
   createdAt?: string,
   user: Schema.Types.ObjectId
}

const videoModel = new Schema({
   name: {
      type: String,
      required: true
   },

   isPublic: {
      type: Boolean
   },

   views: {
      type: Number,
      default: 0
   },

   likes: {
      type: Number,
      default: 0
   },

   dislikes: {
      type: Number,
      default: 0
   },

   description: {
      type: String
   },

   video: {
      type: String,
      required: true
   },

   preview: {
      type: String,
      required: true
   },

   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }

}, { timestamps: true })

export const Video = model<VideoModelI>('Video', videoModel)