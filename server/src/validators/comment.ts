import { body } from "express-validator";

export const comment = [
   body('text', 'Text is required')
      .isString()
      .withMessage('Incorrect comment body'),
]