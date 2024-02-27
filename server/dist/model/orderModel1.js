"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order1 = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    priority: { type: Number, required: true, default: 0 },
    deliveryTime: { type: Date },
    inHouseWaitTime: { type: Number },
    courseGapTime: { type: Number },
});
exports.order1 = mongoose_1.default.model('Ordersthree', orderSchema);
