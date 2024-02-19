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
exports.changeOrderStatus = exports.findOrdersByRestaurantId = exports.addChefToOrder = exports.closeMQConnection = exports.connectAndconsumeMQDataForMarketplaceOrders = exports.incomingOrder = void 0;
const skeleton_service_1 = require("../services/skeleton.service");
const amqplib_1 = __importDefault(require("amqplib"));
const __1 = require("..");
// OLD
function incomingOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = req;
            if (!user)
                return res.status(401).send({ message: 'Unauthorized' });
            const data = req.body;
            console.log('order data from inside controller======', data);
            console.log('order data from skeleton 🥳🥳🥳🥳🥳🥳🥳🥳 ======', data);
            // Emit new order with Socket IO.
            const io = res.locals.io;
            io.to(data.restaurantId.toString()).emit('incoming-order', data);
            res.status(201).json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error in creating a new order." });
        }
    });
}
exports.incomingOrder = incomingOrder;
const queue = "marketplaceOrder";
let connection;
let channel;
// Connect and Create rabbit mq channel and connection
function connectAndconsumeMQDataForMarketplaceOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ampqServer = "amqps://ujuxbuct:HxHHm8XNtbtohKTPHi30fSdILcP9FhGQ@armadillo.rmq.cloudamqp.com/ujuxbuct";
            connection = yield amqplib_1.default.connect(ampqServer);
            channel = yield connection.createChannel();
            yield channel.assertQueue(queue, { durable: false });
            yield channel.consume(queue, (data) => {
                if (data) {
                    // console.log('data has come');
                    const order = JSON.parse(data.content.toString());
                    console.log('Order From Queue', order);
                    // Emit new order with Socket IO.
                    __1.io.to(order.restaurantId.toString()).emit('incoming-order', order);
                }
            }, { noAck: true }); // noAck true for now. Make it false when KDS and INVENTORY not giving any more error
        }
        catch (err) {
            console.log(err);
        }
        finally {
            // if (channel) await channel.close()
        }
    });
}
exports.connectAndconsumeMQDataForMarketplaceOrders = connectAndconsumeMQDataForMarketplaceOrders;
// Close rabbitmq connection and channel
function closeMQConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (connection)
                yield connection.close();
            if (channel)
                yield channel.close();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.closeMQConnection = closeMQConnection;
function addChefToOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const token = req.token;
            if (!user || !token)
                return res.status(401).send({ message: "Unauthorized." });
            const orderId = req.params.orderId;
            const chef = req.body.chef;
            const order = yield (0, skeleton_service_1.sendOrderChefToPOS)(token, orderId, chef);
            res.send(order);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error in setting chef for order." });
        }
    });
}
exports.addChefToOrder = addChefToOrder;
function findOrdersByRestaurantId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.token;
            if (!token)
                return res.status(401).send({ message: "Unauthorized." });
            const orders = yield (0, skeleton_service_1.getAllOrders)(token);
            res.status(200).json(orders);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error in finding orders by restaurantId." });
        }
    });
}
exports.findOrdersByRestaurantId = findOrdersByRestaurantId;
function changeOrderStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const token = req.token;
            if (!user || !token)
                return res.status(401).send({ message: "Unauthorized." });
            const { orderId, status, type } = req.body;
            if (!orderId ||
                (status !== "pending" &&
                    status !== "preparing" &&
                    status !== "ready" &&
                    status !== "complete"))
                return res.status(400).send({ message: "Invalid fields." });
            const order = yield (0, skeleton_service_1.sendOrderUpdateToPOS)(token, orderId, status, type);
            if (status === 'ready' || status === 'complete') {
                if (order.chef) {
                    const chefId = order.chef.employeeInformation.id;
                    const totalPrepTime = order.items.reduce((total, item) => item.item.itemPreparationtime + total, 0);
                    const actualPrepTime = (new Date(order.readyTimestamp).getTime() - new Date(order.preparingTimestamp).getTime()) / 60000;
                    const servedOnTime = totalPrepTime <= actualPrepTime;
                    (0, skeleton_service_1.postChefEfficiencyToHR)(token, { chefId, orderId: order._id, servedOnTime });
                }
            }
            res.status(200).json(order);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error in updating order status." });
        }
    });
}
exports.changeOrderStatus = changeOrderStatus;
