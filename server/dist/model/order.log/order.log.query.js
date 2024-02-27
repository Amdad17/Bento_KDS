"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderLogByOrderId = exports.updateOrderLogById = exports.createOrderLog = exports.getAllOrderLogs = void 0;
const order_log_model_1 = __importDefault(require("../order.log/order.log.model"));
const getAllOrderLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const orderlogs = yield order_log_model_1.default.find().populate('orderId').exec();
    return orderlogs;
});
exports.getAllOrderLogs = getAllOrderLogs;
const getOrderLogByOrderId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderlog = yield order_log_model_1.default.find({ tableId: id }).
        sort({ createdAt: -1 }).
        limit(1).
        populate('orderId').
        exec();
    return orderlog;
});
exports.getOrderLogByOrderId = getOrderLogByOrderId;
const createOrderLog = (orderlogObject) => __awaiter(void 0, void 0, void 0, function* () {
    const orderlog = yield order_log_model_1.default.create(Object.assign({}, orderlogObject));
    return orderlog;
});
exports.createOrderLog = createOrderLog;
const updateOrderLogById = (id, orderlogObject) => __awaiter(void 0, void 0, void 0, function* () {
    const orderlog = yield order_log_model_1.default.findByIdAndUpdate(id, {
        $set: Object.assign({}, orderlogObject)
    }, { new: true });
    return orderlog;
});
exports.updateOrderLogById = updateOrderLogById;
