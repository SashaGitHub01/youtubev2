import { validationResult } from "express-validator";
import express from "express";
import { ApiError } from "../utils/ApiError";

export const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
   const errors = validationResult(req);

   if (errors.isEmpty()) return next()

   const extractedErrors: any[] | undefined = []
   errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

   return next(ApiError.badReq('Invalid body', extractedErrors))
}