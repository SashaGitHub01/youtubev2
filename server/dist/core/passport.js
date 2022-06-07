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
exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ApiError_1 = require("../utils/ApiError");
const extractJwt = (req) => {
    var _a;
    const verify = jsonwebtoken_1.default.verify((_a = req.session) === null || _a === void 0 ? void 0 : _a.token, process.env.SECRET);
    if (verify) {
        return req.session.token;
    }
    return null;
};
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.SECRET,
    jwtFromRequest: extractJwt
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload.id) {
            return done(null, payload.id);
        }
        else {
            return done(ApiError_1.ApiError.internal('Invalid token'), false);
        }
    }
    catch (err) {
        return done(ApiError_1.ApiError.internal(err.message), false);
    }
})));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: 'email'
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return done(ApiError_1.ApiError.unauthorized('User not found'), false);
        }
        else {
            const check = yield bcryptjs_1.default.compare(password, user.password);
            if (!check)
                return done(ApiError_1.ApiError.unauthorized('Invalid email or password'), false);
            return done(null, user._id);
        }
    }
    catch (err) {
        return done(err.message, false);
    }
})));
passport_1.default.serializeUser((id, done) => {
    done(null, id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findById(id);
    done(null, user);
}));
//# sourceMappingURL=passport.js.map