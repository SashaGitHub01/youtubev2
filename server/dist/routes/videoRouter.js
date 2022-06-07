"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const videoCtrl_1 = require("../controllers/videoCtrl");
exports.videoRouter = express_1.default.Router();
exports.videoRouter.get('/popular', videoCtrl_1.videoCtrl.popularVideos);
exports.videoRouter.get('/user/:userId', videoCtrl_1.videoCtrl.videosByUserId);
exports.videoRouter.get('/secure/:id', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.secureVideo);
exports.videoRouter.get('/studio', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.studioVideos);
exports.videoRouter.get('/:id', videoCtrl_1.videoCtrl.oneVideo);
exports.videoRouter.get('/', videoCtrl_1.videoCtrl.allVideos);
exports.videoRouter.post('/', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.create);
exports.videoRouter.put('/like/:id', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.like);
exports.videoRouter.put('/dislike/:id', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.dislike);
exports.videoRouter.put('/views/:id', videoCtrl_1.videoCtrl.updateViews);
exports.videoRouter.put('/:id', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.update);
exports.videoRouter.delete('/:id', passport_1.default.authenticate('jwt'), videoCtrl_1.videoCtrl.delete);
//# sourceMappingURL=videoRouter.js.map