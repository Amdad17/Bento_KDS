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
exports.handleRestaurantUtilization = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
function handleRestaurantUtilization(token, restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chefData = yield (0, skeleton_service_1.getActiveChefsFromHR)(token);
            const chefs = chefData.data;
            const orderData = yield (0, skeleton_service_1.getAllOrders)(token);
            const orders = orderData;
            const currentUtilization = yield (0, skeleton_service_1.getRestaurantUtilizationFromSkeleton)(token, restaurantId);
            const calculated = calculateUtilization(orders, chefs);
            if (calculated !== currentUtilization.utilization)
                yield (0, skeleton_service_1.postRestaurantUtilizationToSkeleton)(token, { utilization: calculated });
            return calculated;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error calculating and setting restaurant utilization.');
        }
    });
}
exports.handleRestaurantUtilization = handleRestaurantUtilization;
function calculateUtilization(orders, chefs) {
    const totalChefHours = chefs.length * 60;
    const pendingOrders = orders.filter(order => order.status === "pending");
    const totalPreparationTime = pendingOrders.reduce((total, order) => {
        const totalPrep = order.items.reduce((total, item) => item.item.itemPreparationtime + total, 0);
        return totalPrep + total;
    }, 0);
    const calculatedUtilization = (totalPreparationTime / totalChefHours) * 100;
    const roundedUtilization = Math.round(calculatedUtilization / 10) * 10;
    return roundedUtilization;
}
