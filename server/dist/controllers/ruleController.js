"use strict";
// import { Request, Response } from 'express';
// import { PermanentRuleModel,RestaurantBaseRuleModel,RuleOverrideModel} from '../model/ruleModel';
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
exports.createRule = exports.getRules = void 0;
const ruleModel_1 = __importDefault(require("../model/ruleModel"));
const getRules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rules = yield ruleModel_1.default.find();
        res.json(rules);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getRules = getRules;
const createRule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRule = req.body;
        const createRule = yield ruleModel_1.default.create(newRule);
        res.status(201).json(createRule);
    }
    catch (error) {
        console.error(error);
        // res.status(500).send(error);
        res.status(500).json({ message: 'Error creating rule' });
    }
});
exports.createRule = createRule;
// Add additional controller methods for update, delete, etc.
