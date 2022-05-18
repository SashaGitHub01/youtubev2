import { Schema, model, Document, SchemaTypes } from "mongoose";
import jwt from 'jsonwebtoken'

export interface UserModelI extends Document {
   name: string,
   email: string,
   password: string,
   location?: string,
   avatar: string,
   banner?: string,
   subscribersCount: number,
   isVerified: boolean,
   createdAt: string,
   views?: Schema.Types.ObjectId[],
   likes?: Schema.Types.ObjectId[],
   dislikes?: Schema.Types.ObjectId[],
   generateToken: (id: string) => string
}



const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      unique: true,
      required: true
   },

   password: {
      type: String,
      unique: true,
      required: true
   },

   location: {
      type: String,
   },

   avatar: {
      type: String
   },

   banner: String,

   subscribersCount: {
      type: Number,
      default: 0
   },

   isVerified: {
      type: Boolean,
      default: false
   },

   views: [{
      type: SchemaTypes.ObjectId,
      ref: "Video"
   }],

   likes: [{
      type: SchemaTypes.ObjectId,
      ref: "Video"
   }],

   dislikes: [{
      type: SchemaTypes.ObjectId,
      ref: "Video"
   }],
},
   { timestamps: true })

userSchema.set('toJSON', {
   transform: function (_, ret) {
      delete ret['password'];
      return ret;
   }
})

userSchema.methods.generateToken = (id: string) => {
   return jwt.sign({ id }, process.env.SECRET as string, { expiresIn: '1d' })
}

export const User = model<UserModelI>('User', userSchema)



