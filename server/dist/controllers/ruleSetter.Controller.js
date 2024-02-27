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
exports.updateRuleOverride = exports.addRuleOverride = exports.updateRestaurantBaseRule = exports.addRestaurantBaseRule = void 0;
const ruleSetter_model_1 = require("../model/ruleSetter.model");
const addRestaurantBaseRule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRule = req.body;
        const createRestaurantBaseRule = yield ruleSetter_model_1.RestaurantBaseRule.create(newRule);
        res.status(201).json(createRestaurantBaseRule);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});
exports.addRestaurantBaseRule = addRestaurantBaseRule;
const updateRestaurantBaseRule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRule = yield ruleSetter_model_1.RestaurantBaseRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRule)
            return res.status(404).json({ message: 'Rule not found' });
        res.json(updatedRule);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateRestaurantBaseRule = updateRestaurantBaseRule;
const addRuleOverride = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOverride = req.body;
        const createRuleOverride = yield ruleSetter_model_1.RuleOverride.create(newOverride);
        res.status(202).json(createRuleOverride);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addRuleOverride = addRuleOverride;
const updateRuleOverride = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOverride = yield ruleSetter_model_1.RuleOverride.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOverride)
            return res.status(404).json({ message: 'Override not found' });
        res.json(updatedOverride);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateRuleOverride = updateRuleOverride;
