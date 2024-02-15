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
exports.orderServed = void 0;
function orderServed(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = req;
            if (!user)
                return res.status(401).send({ message: 'Unauthorized' });
            const orderId = req.params.orderId;
            const orderServed = req.body;
            // Emit order served event with Socket IO.
            const io = res.locals.io;
            io.to(user.employeeInformation.restaurantId.toString()).emit('order-served', Object.assign({ orderId }, orderServed));
            res.status(200).json({ message: 'Order served successfully.' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error in marking the order as served." });
        }
    });
}
exports.orderServed = orderServed;
