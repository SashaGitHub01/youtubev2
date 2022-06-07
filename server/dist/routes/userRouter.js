"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const userCtrl_1 = require("../controllers/userCtrl");
const registrer_1 = require("../validators/registrer");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/register', registrer_1.register, userCtrl_1.userCtrl.register);
exports.userRouter.post('/login', passport_1.default.authenticate('local'), userCtrl_1.userCtrl.login);
exports.userRouter.get('/auth', passport_1.default.authenticate('jwt'), userCtrl_1.userCtrl.auth);
exports.userRouter.get('/logout', userCtrl_1.userCtrl.logout);
exports.userRouter.get('/popular', userCtrl_1.userCtrl.popularUsers);
exports.userRouter.get('/:id', userCtrl_1.userCtrl.oneUser);
exports.userRouter.put('/', passport_1.default.authenticate('jwt'), userCtrl_1.userCtrl.updateUser);
exports.userRouter.get('/', userCtrl_1.userCtrl.allUsers);
//# sourceMappingURL=userRouter.js.map