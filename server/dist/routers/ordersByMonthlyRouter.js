"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersByMonthly_controller_1 = require("../controllers/ordersByMonthly.controller");
const ordersBYMonthlyRouter = express_1.default.Router();
ordersBYMonthlyRouter.get('/ordersMonthly', ordersByMonthly_controller_1.getAllOrdersByMonthlyController);
exports.default = ordersBYMonthlyRouter;
