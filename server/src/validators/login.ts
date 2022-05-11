import { body } from "express-validator";

export const login = [
   body('email', 'Email is required')
      .isEmail()
      .withMessage('Incorrect email'),

   body('password', 'Password is required')
      .isString()
      .isLength({
         min: 6,
         max: 30
      })
      .withMessage('Min length is 6 and max is 30')
]