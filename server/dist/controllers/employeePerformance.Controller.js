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
const employeeperformance_model_1 = require("../model/employeeperformance.model");
function createEmployeePerformance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const newEmployeePerformance = yield employeeperformance_model_1.EmployeePerformanceModel.create(data);
            res.status(201).json(newEmployeePerformance);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in creating employee performance record.' });
        }
    });
}
exports.createEmployeePerformance = createEmployeePerformance;
function findEmployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employeeId = (req.params.employeeId, 10);
            const employee = yield employeeperformance_model_1.EmployeePerformanceModel.find(employeeId);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found.' });
            }
            res.status(200).json(employee);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in finding employee by ID.' });
        }
    });
}
exports.findEmployeeById = findEmployeeById;
function updateEmployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employeeId = (req.params.employeeId, 10);
            const data = req.body;
            const updatedEmployee = yield employeeperformance_model_1.EmployeePerformanceModel.update(employeeId, data);
            if (!updatedEmployee) {
                return res.status(404).json({ error: 'Employee not found.' });
            }
            res.status(200).json(updatedEmployee);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in updating employee record by ID.' });
        }
    });
}
exports.updateEmployeeById = updateEmployeeById;
function deleteEmployeeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const employeeId = (req.params.employeeId, 10);
            const deletedEmployee = yield employeeperformance_model_1.EmployeePerformanceModel.delete(employeeId);
            if (!deletedEmployee) {
                return res.status(404).json({ error: 'Employee not found.' });
            }
            res.status(200).json(deletedEmployee);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in deleting employee record by ID.' });
        }
    });
}
exports.deleteEmployeeById = deleteEmployeeById;
function findEmployeesByRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const role = req.params.role;
            const employees = yield employeeperformance_model_1.EmployeePerformanceModel.find(role);
            res.status(200).json(employees);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in finding employees by role.' });
        }
    });
}
exports.findEmployeesByRole = findEmployeesByRole;
function findEmployeesBySkillTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const skillTag = req.params.skillTag;
            const employees = yield employeeperformance_model_1.EmployeePerformanceModel.find(skillTag);
            res.status(200).json(employees);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in finding employees by skill tag.' });
        }
    });
}
exports.findEmployeesBySkillTag = findEmployeesBySkillTag;
