import express from 'express'
import { userRouter } from './userRouter'
import { videoRouter } from './videoRouter'

export const router = express.Router()

router.use('/user', userRouter)
router.use('/video', videoRouter)