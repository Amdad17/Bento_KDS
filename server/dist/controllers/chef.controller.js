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
exports.postChefEfficiency = exports.chefCheckOut = exports.chefCheckIn = exports.getActiveChefs = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
function getActiveChefs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = req;
            if (!token)
                return res.status(401).send({ message: 'Unauthorized.' });
            const response = yield (0, skeleton_service_1.getActiveChefsFromHR)(token);
            res.send(response);
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
}
exports.getActiveChefs = getActiveChefs;
function chefCheckIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = req;
            if (!user)
                return res.status(401).send({ message: 'Unauthorized.' });
            const io = res.locals.io;
            io.to(user.employeeInformation.restaurantId.toString()).emit('chef-check-in', { chef: user });
            res.send({ status: "success" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
}
exports.chefCheckIn = chefCheckIn;
function chefCheckOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = req;
            if (!user)
                return res.status(401).send({ message: 'Unauthorized.' });
            const io = res.locals.io;
            io.to(user.employeeInformation.restaurantId.toString()).emit('chef-check-out', { chef: user });
            res.send({ status: "success" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
}
exports.chefCheckOut = chefCheckOut;
function postChefEfficiency(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, token } = req;
            if (!user || !token)
                return res.status(401).send({ message: 'Unauthorized' });
            const { chefId, orderId, servedOnTime } = req.body;
            yield (0, skeleton_service_1.postChefEfficiencyToHR)(token, { chefId, orderId, servedOnTime });
            res.status(200).json({ message: 'Order served successfully, and chef efficiency updated.' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error in marking the order as served and updating chef efficiency.' });
        }
    });
}
exports.postChefEfficiency = postChefEfficiency;
