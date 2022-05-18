import express from 'express'
import passport from 'passport'
import { commentCtrl } from '../controllers/commentCtrl'
import { validate } from '../validators'
import { comment } from '../validators/comment'

export const commentRouter = express.Router()

commentRouter.get('/:id', commentCtrl.getByVideo)
commentRouter.delete('/:id', passport.authenticate('jwt'), commentCtrl.delete)
commentRouter.post('/:videoId', comment, validate, passport.authenticate('jwt'), commentCtrl.create)