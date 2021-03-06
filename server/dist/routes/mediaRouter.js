"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const mediaCtrl_1 = require("../controllers/mediaCtrl");
const multer_1 = require("../core/multer");
exports.mediaRouter = express_1.default.Router();
exports.mediaRouter.post('/video', passport_1.default.authenticate('jwt'), multer_1.upload.single('media'), mediaCtrl_1.mediaCtrl.video);
exports.mediaRouter.post('/previews', passport_1.default.authenticate('jwt'), multer_1.upload.single('media'), mediaCtrl_1.mediaCtrl.preview);
exports.mediaRouter.post('/avatars', passport_1.default.authenticate('jwt'), multer_1.upload.single('media'), mediaCtrl_1.mediaCtrl.avatar);
//# sourceMappingURL=mediaRouter.js.map