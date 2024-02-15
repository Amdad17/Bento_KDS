"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromStatus = void 0;
function getDataFromStatus(status) {
    switch (status) {
        case "preparing":
            return { status, preparingTimestamp: new Date() };
        case "ready":
            return { status, readyTimestamp: new Date() };
        case "complete":
            return { status, servedTimestamp: new Date() };
        default:
            return { status };
    }
}
exports.getDataFromStatus = getDataFromStatus;
