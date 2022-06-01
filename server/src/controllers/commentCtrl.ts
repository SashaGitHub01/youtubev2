import { Comment } from "../models/Comment";
import { ApiError } from "../utils/ApiError";
import express from 'express'
import { Video } from "../models/Video";

class CommentCtrl {
   create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const video = await Video.findById(req.params.videoId)
         if (!video) {
            return next(ApiError.notFound('Video not found'))
         }

         const body = {
            user: req.user,
            video: req.params.videoId,
            text: req.body.text,
         }

         const comm = await Comment.create(body)

         return res.json({
            data: comm
         })

      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   getByVideo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const comms = await Comment.find({ video: req.params.id })
            .sort({ createdAt: '-1' })
            .populate({ path: 'user', select: 'name avatar _id' })

         return res.json({
            data: comms
         })

      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const comm = await Comment.findOneAndDelete({ $and: [{ _id: req.params.id }, { _user: req.user }] })
         if (!comm) {
            return next(ApiError.notFound('Comment not found'))
         }

         return res.json({
            data: comm._id
         })

      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }
}

export const commentCtrl = new CommentCtrl()