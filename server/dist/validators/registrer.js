"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const express_validator_1 = require("express-validator");
exports.register = [
    (0, express_validator_1.body)('email', 'Email is required')
        .isEmail()
        .withMessage('Incorrect email'),
    (0, express_validator_1.body)('name', 'Name is required')
        .isString()
        .isLength({
        min: 2,
        max: 50
    }),
    (0, express_validator_1.body)('password', 'Password is required')
        .isString()
        .isLength({
        min: 6,
        max: 30
    })
        .withMessage('Min length is 6 and max is 30')
        .custom((value, { req }) => {
        if (value !== req.body.password2) {
            throw new Error('Passwords are not equal');
        }
        else {
            return value;
        }
    })
];
//# sourceMappingURL=registrer.js.map