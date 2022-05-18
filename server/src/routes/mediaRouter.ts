import express from 'express'
import passport from 'passport'
import { mediaCtrl } from '../controllers/mediaCtrl'
import { upload } from '../core/multer'

export const mediaRouter = express.Router()

mediaRouter.post('/:folder', passport.authenticate('jwt'), upload.single('media'), mediaCtrl.media)
