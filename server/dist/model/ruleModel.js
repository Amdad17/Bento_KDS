"use strict";
// import mongoose, { Schema } from 'mongoose';
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
// export interface PermanentRule {
//   id: string;
//   description: string;
// }
// export interface RestaurantBaseRule {
//   restaurantId: string;
//   ruleType: 'Vip-inHouse' | 'Delivery' | 'InHouse';
//   priority: number;
// }
// export interface RuleOverride {
//   ruleId: string;
//   conditionType: 'DeliveryTime' | 'InHouseWaitingTime' | 'CourseGap';
//   conditionValue: number;
// }
// const PermanentRuleSchema = new Schema<PermanentRule>({
//   id: { type: String, required: true, unique: true },
//   description: { type: String, required: true },
// });
// const RestaurantBaseRuleSchema = new Schema<RestaurantBaseRule>({
//   restaurantId: { type: String, required: true },
//   ruleType: { type: String, required: true, enum: ['Vip-inHouse', 'Delivery', 'InHouse'] },
//   priority: { type: Number, required: true },
// });
// const RuleOverrideSchema = new Schema<RuleOverride>({
//   ruleId: { type: String, required: true },
//   conditionType: { type: String, required: true, enum: ['DeliveryTime', 'InHouseWaitingTime', 'CourseGap'] },
//   conditionValue: { type: Number, required: true },
// });
// export const PermanentRuleModel = mongoose.model('PermanentRulethree', PermanentRuleSchema);
// export const RestaurantBaseRuleModel = mongoose.model('RestaurantBaseRulefour', RestaurantBaseRuleSchema);
// export const RuleOverrideModel = mongoose.model('RuleOverridefour', RuleOverrideSchema);
const mongoose_1 = __importStar(require("mongoose"));
const RuleSchema = new mongoose_1.Schema({
    ruleType: { type: String, required: true },
    orderType: { type: String, required: true },
    description: { type: String, required: true },
    conditions: {
        riderDistance: Number,
        customerWait: Number,
        courseWait: Number
    }
});
exports.default = mongoose_1.default.model('Rule', RuleSchema);
