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
exports.getUser = exports.getToken = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
function getToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code } = req.params;
            const response = yield (0, skeleton_service_1.getTokenFromCode)(code);
            const token = response.headers['authorization'];
            if (token) {
                res.setHeader("Authorization", token);
                res.send({ auth: true });
            }
            else
                res.status(401).send({ message: "No auth token found." });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
}
exports.getToken = getToken;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user)
                res.send({ user });
            else
                res.status(401).send({ message: 'Unauthorized' });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
}
exports.getUser = getUser;
