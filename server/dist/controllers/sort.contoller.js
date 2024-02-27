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
exports.saveRule = void 0;
const ruleModel_1 = require("../model/ruleModel");
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(rule) {
        this.heap.push(rule);
        this.heapifyUp();
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const root = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown();
        }
        return root;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    heapifyUp() {
        let currentIdx = this.heap.length - 1;
        while (currentIdx > 0) {
            const parentIdx = Math.floor((currentIdx - 1) / 2);
            if (this.heap[parentIdx].priority > this.heap[currentIdx].priority) {
                this.swap(parentIdx, currentIdx);
                currentIdx = parentIdx;
            }
            else {
                break;
            }
        }
    }
    heapifyDown() {
        let currentIdx = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIdx = 2 * currentIdx + 1;
            const rightChildIdx = 2 * currentIdx + 2;
            let swapIdx = null;
            if (leftChildIdx < length && this.heap[leftChildIdx].priority < this.heap[currentIdx].priority) {
                swapIdx = leftChildIdx;
            }
            if (rightChildIdx < length && this.heap[rightChildIdx].priority < this.heap[currentIdx].priority) {
                if (swapIdx === null || this.heap[rightChildIdx].priority < this.heap[leftChildIdx].priority) {
                    swapIdx = rightChildIdx;
                }
            }
            if (swapIdx === null) {
                break;
            }
            this.swap(currentIdx, swapIdx);
            currentIdx = swapIdx;
        }
    }
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}
const saveRule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { permanentRule, restaurantBaseRule, ruleOverride } = req.body;
        const createdPermanentRule = yield ruleModel_1.PermanentRuleModel.create(permanentRule);
        const createdRestaurantBaseRule = yield ruleModel_1.RestaurantBaseRuleModel.create(restaurantBaseRule);
        const createdRuleOverride = yield ruleModel_1.RuleOverrideModel.create(ruleOverride);
        const priorityQueue = new PriorityQueue();
        priorityQueue.enqueue(createdPermanentRule);
        priorityQueue.enqueue(createdRestaurantBaseRule);
        priorityQueue.enqueue(createdRuleOverride);
        return res.status(201).json({
            sortedRules: priorityQueue.heap,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.saveRule = saveRule;
