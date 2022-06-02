import { ApiError } from "../utils/ApiError";
import express from 'express'
import { User, UserModelI } from "../models/User";
import { Video, VideoModelI } from "../models/Video";
import mongoose, { Schema } from "mongoose";
import { Comment } from "../models/Comment";

type SortTypes = 'date' | 'views'

const userSelect = 'avatar _id name subscribersCount isVerified'

class VideoCtrl {
   allVideos = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         let sortOpt = {};
         const { search, sort }: { search?: string, sort?: SortTypes } = req.query

         if (sort) {
            sortOpt = sort === 'date' ? { createdAt: '-1' } : sort === 'views' ? { views: '-1' } : {}
         }

         const videos = await Video.find(
            { $and: [search ? { name: new RegExp(search, 'i') } : {}, { isPublic: true }] },
            {},
            {
               sort: sortOpt,
               populate: {
                  path: 'user', select: userSelect
               }
            }
         )

         return res.json({
            data: videos
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   popularVideos = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const videos = await Video.find({ isPublic: true }, {}, {
            populate: {
               path: 'user', select: userSelect
            }
         })
            .sort({ views: '-1' })
            .limit(10)


         return res.json({
            data: videos
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   oneVideo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const authUser = req.user;
         const id = new mongoose.Types.ObjectId(req.params.id)

         const oneVid = await Video.aggregate()
            .match({ _id: id })
            .lookup({
               from: 'comments',
               localField: '_id',
               foreignField: 'video',
               as: 'comments',
            })
            .addFields({
               commentsCount: { $size: '$comments' },
            })
            .lookup({
               from: 'users',
               localField: 'user',
               foreignField: '_id',
               as: 'user'
            })
            .unwind({ path: '$user' })
            .project({
               comments: 0,
               updatedAt: 0,
               __v: 0,
               'user.password': 0,
               'user.status': 0,
               'user.views': 0,
               'user.likes': 0,
               'user.dislikes': 0,
               'user.createdAt': 0,
               'user.updatedAt': 0,
               'user.__v': 0
            })

         if (!oneVid[0]) return next(ApiError.notFound('Video not found'))

         if (!oneVid[0].isPublic && oneVid[0].user !== authUser) {
            const { video, preview, ...rest } = oneVid[0]

            return res.json({
               data: rest
            })
         }

         return res.json({
            data: oneVid[0]
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   secureVideo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const authUser = req.user;
         const { id } = req.params

         let oneVideo = await Video.findOne({ $and: [{ _id: id }, { user: authUser }] }).populate('user')
         if (!oneVideo) return next(ApiError.notFound('Video not found'))

         return res.json({
            data: oneVideo
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   videosByUserId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const authUser = req.user
         const { userId } = req.params
         const { limit, sort } = req.query

         const sortOptions = {
            createdAt: { createdAt: '-1' },
            views: { views: '-1' }
         }

         const options = {
            $and: [
               { isPublic: authUser === userId ? { $or: [{ isPublic: true }, { isPublic: false }] } : true },
               { user: userId }
            ]
         }

         const videos = await Video.find(options)
            .sort((sort === 'views' ? sortOptions.views : sortOptions.createdAt))
            .limit((limit as unknown as number) || 10)
            .populate({
               path: 'user', select: userSelect
            })

         return res.json({
            data: videos
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const defProps = {
            name: '',
            description: '',
            video: '',
            preview: '',
            ...req.body,
            user: req.user as unknown as Schema.Types.ObjectId,
         }

         const video = await Video.create(defProps)

         return res.json({
            data: video
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const video = await Video.findOneAndUpdate(
            { $and: [{ _id: req.params.id }, { user: req.user }] },
            { $set: { ...req.body } },
            { new: true }
         )
         if (!video) return next(ApiError.notFound('Video not found'))


         return res.json({
            data: video
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const video = await Video.findOneAndDelete(
            { $and: [{ _id: req.params.id, }, { user: req.user }] },
         )
         if (!video) return next(ApiError.notFound('Video not found'))

         Comment.deleteMany({ video: req.params.id })

         return res.json({
            data: video._id
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   updateViews = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const video = await Video.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { views: 1 } },
            { new: true }
         )
         if (!video) {
            return next(ApiError.notFound('Video not found'))
         }

         const user = await User.findById(req.user)
         if (user) {
            user.views?.push(video._id)
            await user.save()
         }

         return res.json({
            data: video.views
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   like = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const user = await User.findById(req.user);
         if (!user) {
            return next(ApiError.unauthorized('You are not authorized'))
         }

         const video = await Video.findById(req.params.id)
         if (!video) {
            return next(ApiError.notFound('Video not found'))
         }

         if (user.likes?.includes(video._id)) {
            await user.update({ $pull: { likes: video._id } })
            await video.update({ $inc: { likes: -1 } })
         } else if (user.dislikes?.includes(video._id)) {
            await user.update({ $push: { likes: video._id }, $pull: { dislikes: video._id } })
            await video.update({ $inc: { likes: 1, dislikes: -1 } })
         } else {
            await user.update({ $push: { likes: video._id } })
            await video.update({ $inc: { likes: 1 } })
         }

         await user.save()
         await video.save()

         return res.json({
            data: video._id
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   dislike = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const user = await User.findById(req.user);
         if (!user) {
            return next(ApiError.unauthorized('You are not authorized'))
         }

         const video = await Video.findById(req.params.id)
         if (!video) {
            return next(ApiError.notFound('Video not found'))
         }

         if (user.dislikes?.includes(video._id)) {
            await user.update({ $pull: { dislikes: video._id } })
            await video.update({ $inc: { dislikes: -1 } })
         } else if (user.likes?.includes(video._id)) {
            await user.update({ $push: { dislikes: video._id }, $pull: { likes: video._id } })
            await video.update({ $inc: { likes: -1, dislikes: 1 } })
         } else {
            await user.update({ $push: { dislikes: video._id } })
            await video.update({ $inc: { dislikes: 1 } })
         }

         await user.save()
         await video.save()

         return res.json({
            data: video._id
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }
}

export const videoCtrl = new VideoCtrl()