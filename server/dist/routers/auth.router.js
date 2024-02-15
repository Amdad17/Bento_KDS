"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/token/:code', auth_controller_1.getToken);
router.get('/user', auth_middleware_1.authMiddleware, auth_controller_1.getUser);
exports.default = router;
