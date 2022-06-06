"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = void 0;
const express_validator_1 = require("express-validator");
exports.comment = [
    (0, express_validator_1.body)('text', 'Text is required')
        .isString()
        .withMessage('Incorrect comment body'),
];
//# sourceMappingURL=comment.js.map