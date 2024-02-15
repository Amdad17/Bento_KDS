"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersByHourly_controller_1 = require("../controllers/ordersByHourly.controller");
const ordersBYHourlyRouter = express_1.default.Router();
ordersBYHourlyRouter.get('/ordersHourly', ordersByHourly_controller_1.getAllOrdersByHourlyController);
exports.default = ordersBYHourlyRouter;
