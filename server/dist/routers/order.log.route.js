"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_log_controller_1 = require("../controllers/order.log.controller");
const OrderLogrouter = express_1.default.Router();
OrderLogrouter.get('/orderlogs-get', order_log_controller_1.getOrderLogController);
OrderLogrouter.get('/orderlogs/:id', order_log_controller_1.getOrderLogByIdController);
OrderLogrouter.put('/orderlogs/:id', order_log_controller_1.updateOrderLogByIdController);
OrderLogrouter.post('/orderlogs', order_log_controller_1.createOrderLogsByIdController);
exports.default = OrderLogrouter;
