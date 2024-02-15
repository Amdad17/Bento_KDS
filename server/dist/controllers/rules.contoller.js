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
exports.getRulesForRestaurant = exports.setRulesRestaurant = void 0;
const rules_query_1 = require("../model/rules/rules.query");
;
function setRulesRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            console.log("add");
            if (!user)
                return res.status(401).send({ message: 'Unauthorized' });
            const restaurantId = user.employeeInformation.restaurantId;
            const data = req.body;
            const rules = yield (0, rules_query_1.findRulesForRestaurant)(restaurantId);
            if (rules) {
                const updatedRules = yield (0, rules_query_1.updateExistingRules)(rules.id, Object.assign(Object.assign({}, data), { restaurantId }));
                res.status(200).send({ rules: updatedRules });
            }
            else {
                const newRules = yield (0, rules_query_1.createRules)(Object.assign(Object.assign({}, data), { restaurantId }));
                res.status(201).send({ rules: newRules });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in creating rules for restaurant.' });
        }
    });
}
exports.setRulesRestaurant = setRulesRestaurant;
function getRulesForRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (!user)
                return res.status(401).send({ message: 'Unauthorized' });
            const restaurantId = user.employeeInformation.restaurantId;
            const rules = yield (0, rules_query_1.findRulesForRestaurant)(restaurantId);
            res.status(200).json(rules);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in finding rules for restaurant.' });
        }
    });
}
exports.getRulesForRestaurant = getRulesForRestaurant;
