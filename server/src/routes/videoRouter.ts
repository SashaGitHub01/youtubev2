import express from 'express'
import passport from 'passport'
import { videoCtrl } from '../controllers/videoCtrl'

export const videoRouter = express.Router()

videoRouter.get('/popular', videoCtrl.popularVideos)
videoRouter.get('/user/:userId', videoCtrl.videosByUserId)
videoRouter.get('/secure/:id', passport.authenticate('jwt'), videoCtrl.secureVideo)
videoRouter.get('/studio', passport.authenticate('jwt'), videoCtrl.studioVideos)
videoRouter.get('/:id', videoCtrl.oneVideo)
videoRouter.get('/', videoCtrl.allVideos)

videoRouter.post('/', passport.authenticate('jwt'), videoCtrl.create)
videoRouter.put('/like/:id', passport.authenticate('jwt'), videoCtrl.like)
videoRouter.put('/dislike/:id', passport.authenticate('jwt'), videoCtrl.dislike)
videoRouter.put('/views/:id', passport.authenticate('jwt'), videoCtrl.updateViews)
videoRouter.put('/:id', passport.authenticate('jwt'), videoCtrl.update)
videoRouter.delete('/:id', passport.authenticate('jwt'), videoCtrl.delete)