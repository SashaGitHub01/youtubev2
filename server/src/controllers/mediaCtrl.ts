import { ApiError } from "../utils/ApiError";
import express from 'express'
import { Video } from "../models/Video";
import fs from 'fs-extra'
import md from 'md5'
import { root } from "../";
import cloudinary from "cloudinary";


class MediaCtrl {
   media = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const { folder } = req.params
         const file = req.file

         if (!file) return next(ApiError.badReq('File is empty'))

         const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
         const uid = md(file.originalname) + Date.now() + `.${ext}`;
         const path = `${root}/uploads/${folder}`

         await fs.ensureDir(path)
         await fs.writeFile(`${path}/${uid}`, file.buffer)

         return res.json({
            data: {
               url: `/uploads/${folder}/${uid}`,
               name: req.body.name || uid
            }
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }

   video = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {

         const file = req.file as Express.Multer.File;
         if (!file) return res.status(400).send();

         cloudinary.v2.uploader.upload_stream(
            {
               folder: 'youtube/videos',
               resource_type: "auto"
            },
            async (error: any, result: any) => {
               if (error || !result) {
                  return next(ApiError.badReq(error.message))
               }
               const url = result.secure_url;

               return res.json({
                  data: {
                     url,
                     name: result?.original_filename
                  }
               })

            }).end(file.buffer)
         return;
      } catch (err) {
         return next(ApiError.internal(err.message))
      }
   }

   avatar = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {

         const file = req.file as Express.Multer.File;
         if (!file) return res.status(400).send();

         cloudinary.v2.uploader.upload_stream(
            {
               folder: 'youtube/images',
            },
            async (error: any, result: any) => {
               if (error || !result) {
                  return next(ApiError.badReq(error.message))
               }
               const url = result.secure_url;

               return res.json({
                  data: {
                     url
                  }
               })

            }).end(file.buffer)
         return;
      } catch (err) {
         return next(ApiError.internal(err.message))
      }
   }

   preview = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {

         const file = req.file as Express.Multer.File;
         if (!file) return res.status(400).send();

         cloudinary.v2.uploader.upload_stream(
            {
               folder: 'youtube/images',
            },
            async (error: any, result: any) => {
               if (error || !result) {
                  return next(ApiError.badReq(error.message))
               }
               const url = result.secure_url;

               return res.json({
                  data: {
                     url
                  }
               })

            }).end(file.buffer)
         return;
      } catch (err) {
         return next(ApiError.internal(err.message))
      }
   }
}

export const mediaCtrl = new MediaCtrl() 