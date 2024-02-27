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
exports.findOrdersByOrderType = exports.deleteOrderById = exports.updateOrderById = exports.findOrdersByRestaurant = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("./order.model"));
function createOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield order_model_1.default.create(data);
            return newOrder;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in creating a new order.');
        }
    });
}
exports.createOrder = createOrder;
function findOrdersByRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.find({ restaurantId });
            return orders;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in finding orders by restaurantId.');
        }
    });
}
exports.findOrdersByRestaurant = findOrdersByRestaurant;
function updateOrderById(orderId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedOrder = yield order_model_1.default.findOneAndUpdate({ orderId }, { $set: data }, { new: true });
            return updatedOrder;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in updating an order by orderId.');
        }
    });
}
exports.updateOrderById = updateOrderById;
function deleteOrderById(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedOrder = yield order_model_1.default.findOneAndDelete({ orderId });
            return deletedOrder;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in deleting an order by orderId.');
        }
    });
}
exports.deleteOrderById = deleteOrderById;
function findOrdersByOrderType(orderType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.find({ orderType });
            return orders;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in finding orders by orderType.');
        }
    });
}
exports.findOrdersByOrderType = findOrdersByOrderType;
exports.default = order_model_1.default;
