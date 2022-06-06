import express, { NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

type MyError = Error & { status: number } & { errors: string[] }

export const errorHandle = (err: MyError, req: express.Request, res: express.Response, next: express.NextFunction) => {
   console.log('MESSAGE:', err.message)
   console.log(process.env.NODE_ENV, process.env.REDIS_PASSWORD, process.env.REDIS_HOST, process.env.REDIS_PORT)
   if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message, errors: err.errors })
   }

   return res.status(500).json({ message: 'Ошибка сервера' })
} 