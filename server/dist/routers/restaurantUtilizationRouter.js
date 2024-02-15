"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_utilization_controller_1 = require("../controllers/restaurant.utilization.controller");
const restaurantUtilizationRouter = (0, express_1.Router)();
restaurantUtilizationRouter.post('/restaurant-Utilization', restaurant_utilization_controller_1.postRestaurantUtilization);
restaurantUtilizationRouter.get('/restaurant-utilization', restaurant_utilization_controller_1.getRestaurantUtilization);
exports.default = restaurantUtilizationRouter;
