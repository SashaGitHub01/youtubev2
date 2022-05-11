import { Schema, model, Document } from 'mongoose'

interface CommentModelI extends Document {
   user: Schema.Types.ObjectId,
   text: string,
   video: Schema.Types.ObjectId,
   createdAt: string
}

const commentSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },

   text: {
      type: String,
      required: true
   },

   video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true
   }
}, { timestamps: true })

export const Comment = model<CommentModelI>('Comment', commentSchema)