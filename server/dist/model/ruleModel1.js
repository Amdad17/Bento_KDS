"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ruleSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    conditionValue: { type: Number, required: true },
    priorityBoost: { type: Number, required: true }
});
exports.Rule = mongoose_1.default.model('Rules', ruleSchema);
