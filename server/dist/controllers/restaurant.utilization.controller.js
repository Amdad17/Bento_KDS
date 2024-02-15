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
exports.getRestaurantUtilization = exports.postRestaurantUtilization = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
function postRestaurantUtilization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, token } = req;
            if (!user || !token)
                return res.status(401).send({ message: "Unauthorized" });
            const { utilization } = req.body;
            yield (0, skeleton_service_1.postRestaurantUtilizationToSkeleton)(token, { utilization });
            res
                .status(200)
                .json({ message: "Order pending, and restaurantUtilization updated." });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                error: "Error in marking the order as pending and updating restaurantUtilization.",
            });
        }
    });
}
exports.postRestaurantUtilization = postRestaurantUtilization;
function getRestaurantUtilization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, token } = req;
            if (!user || !token)
                return res.status(401).send({ message: "Unauthorized" });
            const result = yield (0, skeleton_service_1.getRestaurantUtilizationFromSkeleton)(token, user.employeeInformation.restaurantId);
            console.log('Get utilization result ===>', result);
            res.send(result);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
}
exports.getRestaurantUtilization = getRestaurantUtilization;
