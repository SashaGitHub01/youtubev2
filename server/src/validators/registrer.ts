import { body } from "express-validator";

export const register = [
   body('email', 'Email is required')
      .isEmail()
      .withMessage('Incorrect email'),

   body('name', 'Name is required')
      .isString()
      .isLength({
         min: 2,
         max: 50
      }),

   body('password', 'Password is required')
      .isString()
      .isLength({
         min: 6,
         max: 30
      })
      .withMessage('Min length is 6 and max is 30')
      .custom((value, { req }) => {
         if (value !== req.body.password2) {
            throw new Error('Passwords are not equal')
         } else {
            return value
         }
      })
]