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
exports.deleteRulesById = exports.deleteRulesForRestaurant = exports.updateExistingRules = exports.findRulesForRestaurant = exports.createRules = void 0;
const rules_model_1 = __importDefault(require("./rules.model"));
function createRules(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newRules = yield rules_model_1.default.create(data);
            return newRules;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error in creating rules for restaurant.');
        }
    });
}
exports.createRules = createRules;
function findRulesForRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rules = yield rules_model_1.default.findOne({ restaurantId });
            return rules;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error in finding rules for restaurant.');
        }
    });
}
exports.findRulesForRestaurant = findRulesForRestaurant;
function updateExistingRules(ruleId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedRules = yield rules_model_1.default.findByIdAndUpdate(ruleId, { $set: data }, { new: true });
            return updatedRules;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error in updating exisitng rules for restaurant.');
        }
    });
}
exports.updateExistingRules = updateExistingRules;
function deleteRulesForRestaurant(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedRules = yield rules_model_1.default.findOneAndDelete({ restaurantId });
            return deletedRules;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error in deleting rules for restaurant.');
        }
    });
}
exports.deleteRulesForRestaurant = deleteRulesForRestaurant;
function deleteRulesById(ruleId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedRules = yield rules_model_1.default.findByIdAndDelete(ruleId);
            return deletedRules;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error in deleting rules for restaurant.');
        }
    });
}
exports.deleteRulesById = deleteRulesById;
