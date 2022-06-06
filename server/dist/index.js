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
exports.root = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
require("./core/passport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const errorHandle_1 = require("./middlewares/errorHandle");
const app = (0, express_1.default)();
exports.root = __dirname;
const PORT = process.env.PORT || 3001;
app.set('trust proxy', 1);
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://youtubev2022.vercel.app',
        'https://youtubev2022-git-deploy-sashagithub01.vercel.app',
        process.env.CLIENT
    ],
    credentials: true
}));
app.use((0, cookie_session_1.default)({
    name: 'mySession',
    keys: ['key1'],
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: process.env.NODE_ENV === 'production' ? false : true,
    secure: process.env.NODE_ENV === 'production' ? true : false
}));
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'uploads')));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api', routes_1.router);
app.use(errorHandle_1.errorHandle);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB_URL, { autoIndex: false });
        app.listen(PORT, () => {
            console.log('Server is running', PORT);
        });
    }
    catch (err) {
        console.log(err);
    }
});
start();
//# sourceMappingURL=index.js.map