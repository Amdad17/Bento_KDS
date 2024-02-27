"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderLogSchema = new mongoose_1.Schema({
    restaurantId: { type: Number, required: true },
    orderType: { type: String, required: true },
    waiterId: { type: Number },
    unit: { type: Number },
    vipCustomer: { type: Boolean, required: true },
    status: { type: String, enum: ["pending", "preparing", "ready", "complete", "cancel"], required: true },
    items: { type: { type: Object } },
    createdAt: { type: Date, default: Date.now },
    preparingTimestamp: { type: Date },
    readyTimestamp: { type: Date },
    servedTimestamp: { type: Date },
    chef: { type: Object },
    deliveryTimestamp: { type: Date },
    cancelTimestamp: { type: Date },
});
const OrderLog = mongoose_1.default.model('OrderLog', orderLogSchema);
exports.default = OrderLog;
