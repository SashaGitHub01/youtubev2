"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = require("mongoose");
const videoModel = new mongoose_1.Schema({
    name: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    video: {
        type: String,
    },
    preview: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
exports.Video = (0, mongoose_1.model)('Video', videoModel);
//# sourceMappingURL=Video.js.map