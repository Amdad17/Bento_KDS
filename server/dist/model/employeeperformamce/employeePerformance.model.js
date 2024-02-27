"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeePerformanceModel = void 0;
const mongoose_1 = require("mongoose");
const employeePerformanceSchema = new mongoose_1.Schema({
    employeeId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true },
    role: { type: String, required: true },
    orderPreparationStandardTime: { type: Number, required: true },
    orderStartingTime: { type: Number, required: true },
    orderServingTime: { type: Number, required: true },
    orderDeliveryTime: { type: Number, required: true },
    skillTags: { type: String, required: true },
});
exports.EmployeePerformanceModel = (0, mongoose_1.model)('employeePerformace', employeePerformanceSchema);
