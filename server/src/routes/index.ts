import express from 'express'
import { commentRouter } from './commentRouter'
import { mediaRouter } from './mediaRouter'
import { userRouter } from './userRouter'
import { videoRouter } from './videoRouter'

export const router = express.Router()

router.use('/user', userRouter)
router.use('/video', videoRouter)
router.use('/media', mediaRouter)
router.use('/comment', commentRouter)