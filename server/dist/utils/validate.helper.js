"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChef = void 0;
function validateChef(data) {
    return typeof data === 'object' &&
        typeof data.employeeInformation === 'object' &&
        typeof data.employeeInformation.id === 'number' &&
        typeof data.employeeInformation.name === 'string';
}
exports.validateChef = validateChef;
