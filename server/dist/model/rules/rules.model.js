"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ruleSchema = new mongoose_1.Schema({
    restaurantId: {
        type: Number,
        required: true
    },
    efficiency: {
        type: Boolean,
        required: true,
        default: false
    },
    baseRules: {
        type: [{
                ruleType: {
                    type: String,
                    enum: ['vip', 'delivery', 'in-house'],
                    required: true
                },
                priority: {
                    type: Number,
                    required: true
                }
            }]
    },
    overrideRules: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                ruleType: {
                    type: String,
                    enum: ['rider-arrival-time', 'customer-wait-time', 'course-wait-time'],
                    required: true
                },
                maxTime: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});
const Rules = (0, mongoose_1.model)('rules', ruleSchema);
exports.default = Rules;
