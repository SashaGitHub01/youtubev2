import express from 'express'
import passport from 'passport'
import { userCtrl } from '../controllers/userCtrl'
import { register } from '../validators/registrer'

export const userRouter = express.Router()

userRouter.post('/register', register, userCtrl.register)
userRouter.post('/login', passport.authenticate('local'), userCtrl.login)
userRouter.get('/auth', passport.authenticate('jwt'), userCtrl.auth)
userRouter.get('/logout', userCtrl.logout)
userRouter.get('/popular', userCtrl.popularUsers)
userRouter.get('/:id', userCtrl.oneUser)
userRouter.put('/', passport.authenticate('jwt'), userCtrl.updateUser)
userRouter.get('/', userCtrl.allUsers)