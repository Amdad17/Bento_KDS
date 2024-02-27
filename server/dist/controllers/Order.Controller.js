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
exports.createOrder = exports.getAllOrders = void 0;
const Order_model_1 = require("../model/Order.model");
// Function for fetching all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_model_1.Order.find();
        res.json(orders);
        res.status(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});
exports.getAllOrders = getAllOrders;
// Function for creating an order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const createdOrder = yield Order_model_1.Order.create(newOrder);
        res.status(201).json(createdOrder);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating order' });
    }
});
exports.createOrder = createOrder;
