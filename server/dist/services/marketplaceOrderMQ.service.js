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
exports.closeMQConnection = exports.connectAndconsumeMQDataForMarketplaceOrders = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const __1 = require("..");
const queue = "marketplaceToKDS";
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
            }, { noAck: true });
        }
        catch (err) {
            console.log(err);
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
