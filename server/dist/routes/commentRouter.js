"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const commentCtrl_1 = require("../controllers/commentCtrl");
const validators_1 = require("../validators");
const comment_1 = require("../validators/comment");
exports.commentRouter = express_1.default.Router();
exports.commentRouter.get('/:id', commentCtrl_1.commentCtrl.getByVideo);
exports.commentRouter.delete('/:id', passport_1.default.authenticate('jwt'), commentCtrl_1.commentCtrl.delete);
exports.commentRouter.post('/:videoId', comment_1.comment, validators_1.validate, passport_1.default.authenticate('jwt'), commentCtrl_1.commentCtrl.create);
//# sourceMappingURL=commentRouter.js.map