"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandle = (err, req, res, next) => {
    console.log('MESSAGE:', err.message);
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Ошибка сервера' });
};
exports.errorHandle = errorHandle;
//# sourceMappingURL=errorHandle.js.map