import express, { NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

type MyError = Error & { status: number } & { errors: string[] }

export const errorHandle = (err: MyError, req: express.Request, res: express.Response, next: express.NextFunction) => {
   if (err instanceof ApiError) {
      console.log('MESSAGE:', err.message)
      return res.status(err.status).json({ message: err.message, errors: err.errors })
   }

   return res.status(500).json({ message: 'Ошибка сервера' })
}