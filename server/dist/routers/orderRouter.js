"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_contoller_1 = require("../controllers/order.contoller");
const order_served_controller_1 = require("../controllers/order.served.controller");
const orderrouter = express_1.default.Router();
orderrouter.post('/incoming', order_contoller_1.incomingOrder);
orderrouter.put('/status', order_contoller_1.changeOrderStatus);
orderrouter.put('/chef/:orderId', order_contoller_1.addChefToOrder);
orderrouter.get('/restaurant', order_contoller_1.findOrdersByRestaurantId);
orderrouter.post('/served/:orderId', order_served_controller_1.orderServed);
exports.default = orderrouter;
