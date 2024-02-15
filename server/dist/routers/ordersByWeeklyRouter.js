"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersByweekly_controller_1 = require("../controllers/ordersByweekly.controller");
const ordersBYWeeklyRouter = express_1.default.Router();
ordersBYWeeklyRouter.get('/ordersWeekly', ordersByweekly_controller_1.getAllOrdersByWeeklyController);
exports.default = ordersBYWeeklyRouter;
