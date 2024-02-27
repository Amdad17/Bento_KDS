"use strict";
const mongoose = require('mongoose');
const orderHistorySchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    completedAt: { type: Date, default: Date.now },
});
const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
module.exports = OrderHistory;
