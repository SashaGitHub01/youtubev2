import express from 'express';
import session from 'express-session';
import { config } from 'dotenv'
config()
import passport from 'passport'
import './core/passport'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import { router } from './routes';
import { errorHandle } from './middlewares/errorHandle';
const app = express()
const redis = new Redis()
const RedisStore = connectRedis(session)
export const root = __dirname;

const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1);
app.use(cors({
   origin: ['http://localhost:3000', process.env.CLIENT as string],
   credentials: true
}));

app.use(session({
   name: 'userSession',
   secret: process.env.SECRET as string,
   cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: process.env.NODE_ENV === 'production' ? false : true,
      secure: process.env.NODE_ENV === 'production' ? true : false
   },
   resave: false,
   saveUninitialized: true,
   store: new RedisStore({
      client: redis,
      disableTouch: true,
      pass: process.env.NODE_ENV === 'production' ? process.env.REDIS_PASSWORD : 'pswd',
      host: process.env.NODE_ENV === 'production' ? process.env.REDIS_HOST : 'localhost',
      port: process.env.NODE_ENV === 'production' ? Number(process.env.REDIS_PORT) || 0 : 6379,
   })
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