"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const commentRouter_1 = require("./commentRouter");
const mediaRouter_1 = require("./mediaRouter");
const userRouter_1 = require("./userRouter");
const videoRouter_1 = require("./videoRouter");
exports.router = express_1.default.Router();
exports.router.use('/user', userRouter_1.userRouter);
exports.router.use('/video', videoRouter_1.videoRouter);
exports.router.use('/media', mediaRouter_1.mediaRouter);
exports.router.use('/comment', commentRouter_1.commentRouter);
//# sourceMappingURL=index.js.map