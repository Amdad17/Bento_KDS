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
exports.authMiddleware = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('auth headers=========');
        try {
            const authHeaders = req.headers["authorization"];
            if (!authHeaders)
                return res.status(401).send({ message: "Unauthorized" });
            const check = yield (0, skeleton_service_1.getUserFromToken)(authHeaders);
            console.log(" token infos from middleware ------------- 🥳🥳🥳🥳🥳🥳🥳🥳    ", check);
            if (check) {
                req.user = check.user,
                    req.token = authHeaders;
                next();
            }
            else
                res.status(403).send({ message: 'Forbidden.' });
        }
        catch (error) {
            console.log(error);
            res.status(401).send({ message: 'Unauthorized' });
        }
    });
}
exports.authMiddleware = authMiddleware;
