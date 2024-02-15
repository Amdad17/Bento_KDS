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
exports.getAllOrdersByMonthlyController = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
function getAllOrdersByMonthlyController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.token;
            if (!token)
                return res.status(401).send({ message: "Unauthorized." });
            const orders = yield (0, skeleton_service_1.getAllOrdersByMonthly)(token);
            res.status(200).json(orders);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error in finding orders by Hourly." });
        }
    });
}
exports.getAllOrdersByMonthlyController = getAllOrdersByMonthlyController;
