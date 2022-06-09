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
exports.mediaCtrl = void 0;
const ApiError_1 = require("../utils/ApiError");
const fs_extra_1 = __importDefault(require("fs-extra"));
const md5_1 = __importDefault(require("md5"));
const __1 = require("../");
const cloudinary_1 = __importDefault(require("cloudinary"));
class MediaCtrl {
    constructor() {
        this.media = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { folder } = req.params;
                const file = req.file;
                if (!file)
                    return next(ApiError_1.ApiError.badReq('File is empty'));
                const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
                const uid = (0, md5_1.default)(file.originalname) + Date.now() + `.${ext}`;
                const path = `${__1.root}/uploads/${folder}`;
                yield fs_extra_1.default.ensureDir(path);
                yield fs_extra_1.default.writeFile(`${path}/${uid}`, file.buffer);
                return res.json({
                    data: {
                        url: `/uploads/${folder}/${uid}`,
                        name: req.body.name || uid
                    }
                });
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.video = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file)
                    return res.status(400).send();
                cloudinary_1.default.v2.uploader.upload_stream({
                    folder: 'youtube/videos',
                    resource_type: "auto"
                }, (error, result) => __awaiter(this, void 0, void 0, function* () {
                    console.log('ERROR', error);
                    if (error || !result) {
                        return next(ApiError_1.ApiError.badReq(error.message));
                    }
                    const url = result.secure_url;
                    return res.json({
                        data: {
                            url,
                            name: req.body.name || 'noname'
                        }
                    });
                })).end(file.buffer);
                return;
            }
            catch (err) {
                console.log('ERR', err);
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.avatar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file)
                    return res.status(400).send();
                cloudinary_1.default.v2.uploader.upload_stream({
                    folder: 'youtube/images',
                }, (error, result) => __awaiter(this, void 0, void 0, function* () {
                    if (error || !result) {
                        return next(ApiError_1.ApiError.badReq(error.message));
                    }
                    const url = result.secure_url;
                    return res.json({
                        data: {
                            url
                        }
                    });
                })).end(file.buffer);
                return;
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
        this.preview = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file)
                    return res.status(400).send();
                cloudinary_1.default.v2.uploader.upload_stream({
                    folder: 'youtube/images',
                }, (error, result) => __awaiter(this, void 0, void 0, function* () {
                    if (error || !result) {
                        return next(ApiError_1.ApiError.badReq(error.message));
                    }
                    const url = result.secure_url;
                    return res.json({
                        data: {
                            url
                        }
                    });
                })).end(file.buffer);
                return;
            }
            catch (err) {
                return next(ApiError_1.ApiError.internal(err.message));
            }
        });
    }
}
exports.mediaCtrl = new MediaCtrl();
//# sourceMappingURL=mediaCtrl.js.map