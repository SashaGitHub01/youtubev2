"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCtrl = void 0;
const Comment_1 = require("../models/Comment");
const ApiError_1 = require("../utils/ApiError");
const Video_1 = require("../models/Video");
class CommentCtrl {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const video = yield Video_1.Video.findById(req.params.videoId);
                if (!video) {
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                }
                const body = {
                    user: req.user,
                    video: req.params.videoId,
                    text: req.body.text,
                };
                const comm = yield Comment_1.Comment.create(body);
                return res.json({
                    data: comm
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.getByVideo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comms = yield Comment_1.Comment.find({ video: req.params.id })
                    .sort({ createdAt: '-1' })
                    .populate({ path: 'user', select: 'name avatar _id' });
                return res.json({
                    data: comms
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comm = yield Comment_1.Comment.findOneAndDelete({ $and: [{ _id: req.params.id }, { _user: req.user }] });
                if (!comm) {
                    return next(ApiError_1.ApiError.notFound('Comment not found'));
                }
                return res.json({
                    data: comm._id
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
    }
}
exports.commentCtrl = new CommentCtrl();
//# sourceMappingURL=commentCtrl.js.map