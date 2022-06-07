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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoCtrl = void 0;
const ApiError_1 = require("../utils/ApiError");
const User_1 = require("../models/User");
const Video_1 = require("../models/Video");
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_1 = require("../models/Comment");
const userSelect = 'avatar _id name subscribersCount isVerified';
class VideoCtrl {
    constructor() {
        this.allVideos = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let sortOpt = {};
                const { search, sort, limit = 16, page = 1 } = req.query;
                if (sort) {
                    sortOpt = sort === 'date' ? { createdAt: '-1' } : sort === 'views' ? { views: '-1' } : {};
                }
                const videos = yield Video_1.Video.find({ $and: [search ? { name: new RegExp(search, 'i') } : {}, { isPublic: true }] }, { description: 0, likes: 0, dislikes: 0 }, {
                    sort: sortOpt,
                    skip: (page * limit) - limit,
                    limit: 1 + Number(limit),
                    populate: {
                        path: 'user',
                        select: userSelect
                    }
                });
                const hasMore = videos.length === Number(limit) + 1;
                if (hasMore) {
                    videos.pop();
                }
                return res.json({
                    data: {
                        data: videos,
                        hasMore,
                        page
                    }
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.studioVideos = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const videos = yield Video_1.Video.find({ user }).sort({ 'createdAt': '-1' });
                return res.json({
                    data: videos
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.popularVideos = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const videos = yield Video_1.Video.find({ isPublic: true }, {}, {
                    populate: {
                        path: 'user', select: userSelect
                    }
                })
                    .sort({ views: '-1' })
                    .limit(10);
                return res.json({
                    data: videos
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.oneVideo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authUser = req.user;
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const oneVid = yield Video_1.Video.aggregate()
                    .match({ _id: id })
                    .lookup({
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'video',
                    as: 'comments',
                })
                    .addFields({
                    commentsCount: { $size: '$comments' },
                })
                    .lookup({
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                })
                    .unwind({ path: '$user' })
                    .project({
                    comments: 0,
                    updatedAt: 0,
                    __v: 0,
                    'user.password': 0,
                    'user.status': 0,
                    'user.views': 0,
                    'user.likes': 0,
                    'user.dislikes': 0,
                    'user.createdAt': 0,
                    'user.updatedAt': 0,
                    'user.__v': 0
                });
                if (!oneVid[0])
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                if (!oneVid[0].isPublic && oneVid[0].user !== authUser) {
                    const _a = oneVid[0], { video, preview } = _a, rest = __rest(_a, ["video", "preview"]);
                    return res.json({
                        data: rest
                    });
                }
                return res.json({
                    data: oneVid[0]
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.secureVideo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authUser = req.user;
                const { id } = req.params;
                let oneVideo = yield Video_1.Video.findOne({ $and: [{ _id: id }, { user: authUser }] }).populate('user');
                if (!oneVideo)
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                return res.json({
                    data: oneVideo
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.videosByUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authUser = req.user;
                const { userId } = req.params;
                const { limit = 16, sort, page = 1 } = req.query;
                const sortOptions = {
                    createdAt: { createdAt: '-1' },
                    views: { views: '-1' }
                };
                const options = {
                    $and: [
                        { isPublic: authUser === userId ? { $or: [{ isPublic: true },] } : true },
                        { user: userId }
                    ]
                };
                const videos = yield Video_1.Video.find(options, { description: 0, likes: 0, dislikes: 0 }, {
                    sort: sort === 'views' ? sortOptions.views : sortOptions.createdAt,
                    skip: (page * limit) - limit,
                    limit: 1 + Number(limit),
                    populate: {
                        path: 'user',
                        select: userSelect
                    }
                });
                const hasMore = videos.length === Number(limit) + 1;
                if (hasMore) {
                    videos.pop();
                }
                return res.json({
                    data: {
                        data: videos,
                        hasMore,
                        page
                    }
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const defProps = Object.assign(Object.assign({ name: '', description: '', video: '', preview: '' }, req.body), { user: req.user });
                const video = yield Video_1.Video.create(defProps);
                return res.json({
                    data: video
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const video = yield Video_1.Video.findOneAndUpdate({ $and: [{ _id: req.params.id }, { user: req.user }] }, { $set: Object.assign({}, req.body) }, { new: true });
                if (!video)
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                return res.json({
                    data: video
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const video = yield Video_1.Video.findOneAndDelete({ $and: [{ _id: req.params.id, }, { user: req.user }] });
                if (!video)
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                Comment_1.Comment.deleteMany({ video: req.params.id });
                return res.json({
                    data: video._id
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.updateViews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            try {
                const video = yield Video_1.Video.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } }, { new: true });
                if (!video) {
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                }
                const user = yield User_1.User.findById(req.user);
                if (user) {
                    (_b = user.views) === null || _b === void 0 ? void 0 : _b.push(video._id);
                    yield user.save();
                }
                return res.json({
                    data: video.views
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.like = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            try {
                const user = yield User_1.User.findById(req.user);
                if (!user) {
                    return next(ApiError_1.ApiError.unauthorized('You are not authorized'));
                }
                const video = yield Video_1.Video.findById(req.params.id);
                if (!video) {
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                }
                if ((_c = user.likes) === null || _c === void 0 ? void 0 : _c.includes(video._id)) {
                    yield user.update({ $pull: { likes: video._id } });
                    yield video.update({ $inc: { likes: -1 } });
                }
                else if ((_d = user.dislikes) === null || _d === void 0 ? void 0 : _d.includes(video._id)) {
                    yield user.update({ $push: { likes: video._id }, $pull: { dislikes: video._id } });
                    yield video.update({ $inc: { likes: 1, dislikes: -1 } });
                }
                else {
                    yield user.update({ $push: { likes: video._id } });
                    yield video.update({ $inc: { likes: 1 } });
                }
                yield user.save();
                yield video.save();
                return res.json({
                    data: video._id
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.dislike = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f;
            try {
                const user = yield User_1.User.findById(req.user);
                if (!user) {
                    return next(ApiError_1.ApiError.unauthorized('You are not authorized'));
                }
                const video = yield Video_1.Video.findById(req.params.id);
                if (!video) {
                    return next(ApiError_1.ApiError.notFound('Video not found'));
                }
                if ((_e = user.dislikes) === null || _e === void 0 ? void 0 : _e.includes(video._id)) {
                    yield user.update({ $pull: { dislikes: video._id } });
                    yield video.update({ $inc: { dislikes: -1 } });
                }
                else if ((_f = user.likes) === null || _f === void 0 ? void 0 : _f.includes(video._id)) {
                    yield user.update({ $push: { dislikes: video._id }, $pull: { likes: video._id } });
                    yield video.update({ $inc: { likes: -1, dislikes: 1 } });
                }
                else {
                    yield user.update({ $push: { dislikes: video._id } });
                    yield video.update({ $inc: { dislikes: 1 } });
                }
                yield user.save();
                yield video.save();
                return res.json({
                    data: video._id
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
    }
}
exports.videoCtrl = new VideoCtrl();
//# sourceMappingURL=videoCtrl.js.map