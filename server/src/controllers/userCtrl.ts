import { ApiError } from "../utils/ApiError";
import { validationResult } from "express-validator";
import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from "../models/User";
import jwt from "jsonwebtoken";

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
         const user = await User.findById(req.user)

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

   user = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const user = await User.findById(req.params.id)

         return res.json({
            data: user
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   users = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const users = await User.find()

         return res.json({
            data: users
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

}

export const userCtrl = new UserCtrl()