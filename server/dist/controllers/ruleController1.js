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
exports.prioritizeOrders = exports.addOrder = void 0;
const orderModel1_1 = require("../model/orderModel1");
const ruleModel1_1 = require("../model/ruleModel1");
const addOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new Order document and save it to the database
    const order = yield orderModel1_1.order1.create(orderData);
    return order;
});
exports.addOrder = addOrder;
const prioritizeOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const rules = yield ruleModel1_1.Rule.find();
    const orders = yield orderModel1_1.order1.find();
    orders.forEach(order => {
        rules.forEach(rule => {
            if (order.type === rule.type) {
                if (rule.type === 'Delivery' && order.deliveryTime && new Date(order.deliveryTime).getTime() - Date.now() < rule.conditionValue * 60000) {
                    order.priority += rule.priorityBoost;
                }
            }
        });
    });
    yield Promise.all(orders.map(order => order.save()));
    return orders.sort((a, b) => b.priority - a.priority);
});
exports.prioritizeOrders = prioritizeOrders;
