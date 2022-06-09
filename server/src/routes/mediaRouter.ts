import express from 'express'
import passport from 'passport'
import { mediaCtrl } from '../controllers/mediaCtrl'
import { upload } from '../core/multer'

export const mediaRouter = express.Router()

mediaRouter.post('/video', passport.authenticate('jwt'), upload.single('media'), mediaCtrl.video)
mediaRouter.post('/previews', passport.authenticate('jwt'), upload.single('media'), mediaCtrl.preview)
mediaRouter.post('/avatars', passport.authenticate('jwt'), upload.single('media'), mediaCtrl.avatar)
// mediaRouter.post('/:folder', passport.authenticate('jwt'), upload.single('media'), mediaCtrl.media)

