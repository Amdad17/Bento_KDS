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
exports.OverrideRuleModel = exports.RestaurantBaseRuleModel = exports.PermanentRuleModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Combined Permanent Rule Schema
const permanentRuleSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String }, // For backward compatibility
});
// Combined Restaurant Base Rule Schema
const restaurantBaseRuleSchema = new mongoose_1.Schema({
    restaurantId: { type: String, required: true },
    ruleType: { type: String, required: true, enum: ['Vip-inHouse', 'Delivery', 'InHouse'] },
    priority: { type: Number, required: true },
    hierarchy: { type: [String] }, // For backward compatibility
});
// Combined Override Rule Schema
const overrideRuleSchema = new mongoose_1.Schema({
    ruleId: { type: String },
    type: { type: String, enum: ['driverDistance', 'inHouseWaitTime', 'courseGapPriority'], required: true },
    condition: { type: {} },
});
exports.PermanentRuleModel = mongoose_1.default.model('PermanentRule', permanentRuleSchema);
exports.RestaurantBaseRuleModel = mongoose_1.default.model('RestaurantBaseRule', restaurantBaseRuleSchema);
exports.OverrideRuleModel = mongoose_1.default.model('OverrideRule', overrideRuleSchema);
