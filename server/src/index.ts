import express from 'express';
import { config } from 'dotenv'
config()
import cookieSession from 'cookie-session'
import passport from 'passport'
import './core/passport'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import { router } from './routes';
import { errorHandle } from './middlewares/errorHandle';

const app = express()
export const root = __dirname;

const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1);
app.use(cors({
   origin: [
      'http://localhost:3000',
      'https://youtubev2022.vercel.app',
      'https://youtubev2022-git-deploy-sashagithub01.vercel.app',
      process.env.CLIENT as string
   ],
   credentials: true
}));

app.use(cookieSession({
   name: 'mySession',
   keys: ['key1'],
   maxAge: 1000 * 60 * 60 * 24 * 7,
   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
   httpOnly: process.env.NODE_ENV === 'production' ? false : true,
   secure: process.env.NODE_ENV === 'production' ? true : false
}))

app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(express.json());
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

//router
app.use('/api', router)

//error handler
app.use(errorHandle)


const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL as string, { autoIndex: false });
      app.listen(PORT, () => {
         console.log('Server is running', PORT)
      })
   } catch (err) {
      console.log(err)
   }
}

start();