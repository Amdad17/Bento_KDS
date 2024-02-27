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
exports.findEmployeesBySkillTag = exports.findEmployeesByRole = exports.deleteEmployeeById = exports.updateEmployeeById = exports.findEmployeeById = exports.createEmployeePerformance = void 0;
const employeePerformance_model_1 = require("./employeePerformance.model");
function createEmployeePerformance(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newEmployeePerformance = yield employeePerformance_model_1.EmployeePerformanceModel.create(data);
            return newEmployeePerformance;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in creating employee performance record.');
        }
    });
}
exports.createEmployeePerformance = createEmployeePerformance;
function findEmployeeById(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employee = yield employeePerformance_model_1.EmployeePerformanceModel.findOne({ employeeId });
            return employee;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in finding employee by ID.');
        }
    });
}
exports.findEmployeeById = findEmployeeById;
function updateEmployeeById(employeeId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedEmployee = yield employeePerformance_model_1.EmployeePerformanceModel.findOneAndUpdate({ employeeId }, { $set: data }, { new: true });
            return updatedEmployee;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in updating employee record by ID.');
        }
    });
}
exports.updateEmployeeById = updateEmployeeById;
function deleteEmployeeById(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedEmployee = yield employeePerformance_model_1.EmployeePerformanceModel.findOneAndDelete({ employeeId });
            return deletedEmployee;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in deleting employee record by ID.');
        }
    });
}
exports.deleteEmployeeById = deleteEmployeeById;
function findEmployeesByRole(role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employees = yield employeePerformance_model_1.EmployeePerformanceModel.find({ role });
            return employees;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in finding employees by role.');
        }
    });
}
exports.findEmployeesByRole = findEmployeesByRole;
function findEmployeesBySkillTag(skillTag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employees = yield employeePerformance_model_1.EmployeePerformanceModel.find({ skillTags: skillTag });
            return employees;
        }
        catch (error) {
            console.error(error);
            throw new Error('Error in finding employees by skill tag.');
        }
    });
}
exports.findEmployeesBySkillTag = findEmployeesBySkillTag;
