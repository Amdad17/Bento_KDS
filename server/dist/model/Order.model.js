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
exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const orderItemSchema = new mongoose_1.Schema({
    restaurantId: { type: Number, required: true },
    orderId: { type: Number, required: true },
    categories: [{ type: Object }],
    orderTime: { type: Number, required: true },
    orderType: { type: String, required: true },
    vipCustomer: { type: Boolean, required: true },
    tableId: { type: Number },
    deliveryServiceArriveTime: { type: Number },
    items: [{ type: Object }],
});
exports.Order = mongoose_1.default.model('Order', orderItemSchema);
// const itemSchema = new Schema<ItemInterface>({
//   itemId: { type: Number, required: true },
//   itemName: { type: String, required: true },
//   itemImage: { type: String, required: true },
//   categoryId: { type: Number, required: true },
//   itemQuantity: { type: Number, required: true },
//   itemPreparationTime: { type: Number, required: true },
//   itemPackingType: { type: String, required: true },
//   itemPackingDimension: {
//     dimensionLength: { type: Number, required: true },
//     dimensionWidth: { type: Number, required: true },
//     dimensionHeight: { type: Number, required: true },
//   },
//   itemServingTemperature: { type: String, required: true },
//   itemLastingTime: { type: Number },
//   itemPortionSize: { type: Number, required: true },
//   ingredients: [{ type: Object }],
//   options: {
//     add: [{ type: Object }],
//     no: [{ type: Object }],
//   },
//   optionalNotes: { type: String, required: true },
// });
