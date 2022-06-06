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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCtrl = void 0;
const ApiError_1 = require("../utils/ApiError");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const userProj = {
    email: 0,
    views: 0,
    likes: 0,
    dislikes: 0,
    createdAt: 0,
    updatedAt: 0,
    status: 0,
    password: 0,
};
class UserCtrl {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(ApiError_1.ApiError.badReq((_a = errors.array()[0]) === null || _a === void 0 ? void 0 : _a.msg));
                }
                const check = yield User_1.User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] });
                if (check) {
                    return next(ApiError_1.ApiError.badReq('User already exists'));
                }
                const salt = yield bcryptjs_1.default.genSalt(7);
                const hash = yield bcryptjs_1.default.hash(req.body.password, salt);
                const user = yield User_1.User.create(Object.assign(Object.assign({}, req.body), { password: hash }));
                const token = user.generateToken(user._id);
                req.session.token = token;
                return res.json({
                    data: user
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findById(req.user);
                if (!user) {
                    return next(ApiError_1.ApiError.unauthorized());
                }
                req.session.token = user.generateToken(user._id);
                return res.json({
                    data: user
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findById(req.user, '-createdAt -updatedAt -__v');
                return res.json({
                    data: user
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('mySession');
                return res.json(true);
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.oneUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const user = yield User_1.User.aggregate()
                    .match({ _id: id })
                    .lookup({
                    from: 'videos',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'videos'
                })
                    .addFields({
                    videosCount: { $size: '$videos' },
                    viewsCount: { $sum: '$videos.views' }
                })
                    .project({
                    videos: 0, password: 0, updatedAt: 0, likes: 0, dislikes: 0, views: 0
                });
                if (!(user === null || user === void 0 ? void 0 : user[0]))
                    return next(ApiError_1.ApiError.notFound('User not found'));
                return res.json({
                    data: user[0]
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.popularUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.User.find({}, userProj)
                    .sort({ subscribersCount: '-1' })
                    .limit(10);
                return res.json({
                    data: users
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.allUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                const users = yield User_1.User.aggregate()
                    .match({ $and: [name ? { name: new RegExp(name, 'i') } : {}] })
                    .lookup({
                    from: 'videos',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'videos'
                }).addFields({
                    videosCount: { $size: '$videos' }
                })
                    .project(Object.assign({ videos: 0 }, userProj));
                return res.json({
                    data: users
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield User_1.User.findByIdAndUpdate(req.user, { $set: Object.assign({}, req.body) }, { new: true });
                if (!newUser)
                    return next(ApiError_1.ApiError.notFound('User not found'));
                return res.json({
                    data: newUser
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
    }
}
exports.userCtrl = new UserCtrl();
//# sourceMappingURL=userCtrl.js.map