"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000,
    CORS_ORIGIN: (_b = process.env.CORS_ORIGIN) !== null && _b !== void 0 ? _b : '*',
    MONGOOSE_URI: (_c = process.env.MONGOOSE_URI) !== null && _c !== void 0 ? _c : "mongodb://127.0.0.1:27017/KDS",
    SKELETON_BE_URL: (_d = process.env.SKELETON_BE_URL) !== null && _d !== void 0 ? _d : "http://localhost:4000"
};
