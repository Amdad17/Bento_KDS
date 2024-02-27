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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderLogsByIdController = exports.updateOrderLogByIdController = exports.getOrderLogByIdController = exports.getOrderLogController = void 0;
const order_log_query_1 = require("../model/order.log/order.log.query");
const getOrderLogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderlogs = yield (0, order_log_query_1.getAllOrderLogs)();
        res.json(orderlogs);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getOrderLogController = getOrderLogController;
const getOrderLogByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield (0, order_log_query_1.getOrderLogByOrderId)(id);
        res.json(order);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getOrderLogByIdController = getOrderLogByIdController;
const updateOrderLogByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderLogId = req.params.id;
        const orderLogIdNumber = parseInt(orderLogId, 10);
        const orderLogObject = Object.assign({}, req.body);
        const orderLog = yield (0, order_log_query_1.updateOrderLogById)(orderLogIdNumber, orderLogObject);
        res.json(orderLog);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.updateOrderLogByIdController = updateOrderLogByIdController;
const createOrderLogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderlogObject = Object.assign({}, req.body);
        const orderlog = yield (0, order_log_query_1.createOrderLog)(orderlogObject);
        res.json(orderlog);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.createOrderLogsByIdController = createOrderLogsByIdController;
