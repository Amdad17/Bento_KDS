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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const orderRouter_1 = __importDefault(require("./routers/orderRouter"));
const ruleRouter_1 = __importDefault(require("./routers/ruleRouter"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const config_1 = require("./config");
const auth_middleware_1 = require("./middleware/auth.middleware");
const chef_router_1 = __importDefault(require("./routers/chef.router"));
const ordersByHourlyRouter_1 = __importDefault(require("./routers/ordersByHourlyRouter"));
const ordersByWeeklyRouter_1 = __importDefault(require("./routers/ordersByWeeklyRouter"));
const ordersByMonthlyRouter_1 = __importDefault(require("./routers/ordersByMonthlyRouter"));
const restaurantUtilizationRouter_1 = __importDefault(require("./routers/restaurantUtilizationRouter"));
const order_contoller_1 = require("./controllers/order.contoller");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use((req, res, next) => {
    // Attach io to app locals
    res.locals.io = exports.io;
    next();
});
app.use((0, cors_1.default)({
    origin: config_1.config.CORS_ORIGIN.split(","),
    exposedHeaders: ["Authorization"],
}));
app.use(express_1.default.json());
app.use("/auth", auth_router_1.default);
app.use(auth_middleware_1.authMiddleware);
app.use("/chef", chef_router_1.default);
app.use("/orders", orderRouter_1.default);
app.use("/rules", ruleRouter_1.default);
app.use('/orders-hourly', ordersByHourlyRouter_1.default);
app.use('/orders-weekly', ordersByWeeklyRouter_1.default);
app.use('/orders-monthly', ordersByMonthlyRouter_1.default);
app.use('/utilization', restaurantUtilizationRouter_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await mongoose.connect(config.MONGOOSE_URI);
            console.log("db connected mongoose");
            // connecting to rabbitmq from here
            yield (0, order_contoller_1.connectAndconsumeMQDataForMarketplaceOrders)();
            server.listen(8000, () => {
                console.log("Server running on Port", config_1.config.PORT);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
exports.io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    socket.on("join", (data) => {
        socket.join(data.restaurantId.toString());
    });
});
// Handle server shutdown. Close MQ Connection
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Closing MQ Connection');
    yield (0, order_contoller_1.closeMQConnection)();
    process.exit(0);
}));
