"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ruleSetter_Controller_1 = require("../controllers/ruleSetter.Controller");
const ruleSetterRouter = express_1.default.Router();
ruleSetterRouter.post('/restaurantBaseRule', ruleSetter_Controller_1.addRestaurantBaseRule);
ruleSetterRouter.put('/restaurantBaseRule', ruleSetter_Controller_1.updateRestaurantBaseRule);
ruleSetterRouter.post('/ruleOverride', ruleSetter_Controller_1.addRuleOverride);
ruleSetterRouter.put('/ruleOverride', ruleSetter_Controller_1.updateRuleOverride);
exports.default = ruleSetterRouter;
'';
