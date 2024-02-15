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
exports.getRestaurantUtilizationFromSkeleton = exports.postRestaurantUtilizationToSkeleton = exports.getAllOrdersByMonthly = exports.getAllOrdersByWeekly = exports.getAllOrdersByHourly = exports.postChefEfficiencyToHR = exports.sendOrderChefToPOS = exports.sendOrderUpdateToPOS = exports.getAllOrders = exports.getActiveChefsFromHR = exports.getUserFromToken = exports.getTokenFromCode = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
function getTokenFromCode(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + "/service-auth/token/" + code);
            return res;
        }
        catch (error) {
            throw new Error("Error getting token from code.");
        }
    });
}
exports.getTokenFromCode = getTokenFromCode;
function getUserFromToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log("object====", token);
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + '/service-auth/user-from-token', { headers: { 'Authorization': token } });
            console.log('res from get user token utility 🥳🥳🥳🥳🥳🥳🥳🥳ß', res.data);
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting user from token.");
        }
    });
}
exports.getUserFromToken = getUserFromToken;
function getActiveChefsFromHR(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + '/employee/position/chef/active', { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting active chefs.");
        }
    });
}
exports.getActiveChefsFromHR = getActiveChefsFromHR;
function getAllOrders(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + '/orders/all', { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting orders.");
        }
    });
}
exports.getAllOrders = getAllOrders;
function sendOrderUpdateToPOS(token, orderId, status, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.put(config_1.config.SKELETON_BE_URL + '/orders/status/' + orderId, { status, type }, { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting orderUpdate.");
        }
    });
}
exports.sendOrderUpdateToPOS = sendOrderUpdateToPOS;
function sendOrderChefToPOS(token, orderId, chef) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.put(config_1.config.SKELETON_BE_URL + '/orders/chef/' + orderId, { chef }, { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting  post to ChefToPOS .");
        }
    });
}
exports.sendOrderChefToPOS = sendOrderChefToPOS;
function postChefEfficiencyToHR(token, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post(config_1.config.SKELETON_BE_URL + '/hr/chef-efficiency', data, { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting to post chef efficiency.");
        }
    });
}
exports.postChefEfficiencyToHR = postChefEfficiencyToHR;
function getAllOrdersByHourly(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + '/pos/order-stats/hourly', { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting ordersBYHourly.");
        }
    });
}
exports.getAllOrdersByHourly = getAllOrdersByHourly;
function getAllOrdersByWeekly(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + '/pos/order-stats/weekday', { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting ordersByWeekly.");
        }
    });
}
exports.getAllOrdersByWeekly = getAllOrdersByWeekly;
function getAllOrdersByMonthly(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + 'pos/order-stats/monthly', { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting ordersByMonthly.");
        }
    });
}
exports.getAllOrdersByMonthly = getAllOrdersByMonthly;
function postRestaurantUtilizationToSkeleton(token, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post(config_1.config.SKELETON_BE_URL + '/utilization/set', data, { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting to post RestaurantUtilization.");
        }
    });
}
exports.postRestaurantUtilizationToSkeleton = postRestaurantUtilizationToSkeleton;
function getRestaurantUtilizationFromSkeleton(token, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(config_1.config.SKELETON_BE_URL + '/utilization/restaurant/' + id, { headers: { 'Authorization': token } });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting restaurant utilization from skeleton.");
        }
    });
}
exports.getRestaurantUtilizationFromSkeleton = getRestaurantUtilizationFromSkeleton;
