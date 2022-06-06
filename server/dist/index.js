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
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const passport_1 = __importDefault(require("passport"));
require("./core/passport");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const errorHandle_1 = require("./middlewares/errorHandle");
const app = (0, express_1.default)();
const redis = new ioredis_1.default();
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
exports.root = __dirname;
const PORT = process.env.PORT || 3001;
app.set('trust proxy', 1);
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', process.env.CLIENT],
    credentials: true
}));
console.log(process.env.NODE_ENV, process.env.REDIS_PASSWORD, process.env.REDIS_HOST, process.env.REDIS_PORT);
app.use((0, express_session_1.default)({
    name: 'userSession',
    secret: process.env.SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: process.env.NODE_ENV === 'production' ? false : true,
        secure: process.env.NODE_ENV === 'production' ? true : false
    },
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        client: redis,
        disableTouch: true,
        pass: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    })
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