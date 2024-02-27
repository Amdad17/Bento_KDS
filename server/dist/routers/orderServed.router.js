"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_served_controller_1 = require("../controllers/order.served.controller");
const orderServedRouter = (0, express_1.Router)();
orderServedRouter.post('/Served/:orderId', order_served_controller_1.orderServed);
exports.default = orderServedRouter;
