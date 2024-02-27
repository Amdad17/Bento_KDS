"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleOverride = exports.RestaurantBaseRule = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantBaseRuleSchema = new mongoose_1.default.Schema({
    restaurantId: { type: String, required: true },
    ruleType: { type: String, required: true, enum: ['Vip-inHouse', 'Delivery', ' InHouse'] },
    priority: { type: Number, required: true }
});
const ruleOverrideSchema = new mongoose_1.default.Schema({
    ruleId: { type: String, required: true },
    conditionType: { type: String, required: true, enum: ['DeliveryTime', 'InHouseWaitingTime', 'CourseGap'] },
    conditionValue: { type: Number, required: true }
});
exports.RestaurantBaseRule = mongoose_1.default.model('RestaurantBaseRule', restaurantBaseRuleSchema);
exports.RuleOverride = mongoose_1.default.model('RuleOverride', ruleOverrideSchema);
