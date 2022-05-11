import { Schema, model, Document, } from "mongoose";

export interface VideoModelI extends Document {
   name: string,
   isPublic: boolean,
   views: number,
   like: number,
   dislike: number,
   description: string,
   video: string,
   preview: string,
   createdAt: string
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

   like: {
      type: Number,
      default: 0
   },

   dislike: {
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

}, { timestamps: true })

export const Video = model<VideoModelI>('Video', videoModel)