import { ApiError } from "../utils/ApiError";
import { validationResult } from "express-validator";
import express from 'express'
import bcrypt from 'bcryptjs'
import { User, UserModelI } from "../models/User";

class UserCtrl {
   register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return next(ApiError.badReq(errors.array()[0]?.msg))
         }

         const check = await User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] })
         if (check) {
            return next(ApiError.badReq('User already exists'))
         }

         const salt = await bcrypt.genSalt(7)
         const hash = await bcrypt.hash(req.body.password, salt)

         const user = await User.create({
            ...req.body,
            password: hash
         })

         const token = user.generateToken(user._id);
         (req.session as any).token = token;

         return res.json({
            data: user
         })

      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const user = await User.findById(req.user);
         if (!user) {
            return next(ApiError.unauthorized())
         }

         (req.session as any).token = user.generateToken(user._id);

         return res.json({
            data: user
         })

      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const user = await User.findById(req.user, '-createdAt -updatedAt -__v')

         return res.json({
            data: user
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   logout = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         req.session.destroy((err) => console.log(err))

         return res.json(true)
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   oneUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const user = await User.findById(req.params.id)

         return res.json({
            data: user
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   popularUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const users = await User.find({},)
            .sort({ subscribersCount: '-1' })
            .limit(10)

         return res.json({
            data: users
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   allUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         // make sort by, limit
         const { name }: { name?: string, loc?: string } = req.query
         // const users = await User.find({ $and: [name ? { name: new RegExp(name, 'i') } : {}] })

         const users = await User.aggregate()
            .match({ $and: [name ? { name: new RegExp(name, 'i') } : {}] })
            .lookup({
               from: 'videos',
               localField: '_id',
               foreignField: 'user',
               as: 'videos'
            }).addFields({
               videosCount: { $size: '$videos' }
            })
            .project({ videos: 0, password: 0, updatedAt: 0 })

         return res.json({
            data: users
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   updateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const newUser = await User.findByIdAndUpdate(req.user, { $set: { ...req.body } }, { new: true })
         if (!newUser) return next(ApiError.notFound('User not found'))

         return res.json({
            data: newUser
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

}

export const userCtrl = new UserCtrl()