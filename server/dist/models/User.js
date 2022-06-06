"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        maxlength: 250
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
    },
    avatar: {
        type: String
    },
    banner: String,
    subscribersCount: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    views: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: "Video"
        }],
    likes: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: "Video"
        }],
    dislikes: [{
            type: mongoose_1.SchemaTypes.ObjectId,
            ref: "Video"
        }],
}, { timestamps: true });
userSchema.set('toJSON', {
    transform: function (_, ret) {
        delete ret['password'];
        return ret;
    }
});
userSchema.methods.generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map