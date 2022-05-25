import { ApiError } from "../utils/ApiError";
import express from 'express'
import { Video } from "../models/Video";
import fs from 'fs-extra'
import md from 'md5'
import { root } from "../";

class MediaCtrl {
   media = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
         const { folder } = req.params
         const file = req.file

         if (!file) return next(ApiError.badReq('File is empty'))
         console.log(file.originalname)
         const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
         const uid = md(file.originalname) + Date.now() + `.${ext}`;
         const path = `${root}/uploads/${folder}`

         await fs.ensureDir(path)
         await fs.writeFile(`${path}/${uid}`, file.buffer)

         return res.json({
            data: {
               url: `/uploads/${folder}/${uid}`,
               name: uid
            }
         })
      } catch (err: any) {
         return next(ApiError.internal(err.message))
      }
   }
}

export const mediaCtrl = new MediaCtrl()