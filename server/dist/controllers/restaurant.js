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
exports.updateRestaurantById = exports.getRestaurantById = exports.createRestaurant = exports.getAllRestaurants = void 0;
const restaurant_1 = __importDefault(require("../model/restaurant"));
const getAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_1.default.find();
        res.json(restaurants);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAllRestaurants = getAllRestaurants;
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRestaurant = req.body;
        const createdRestaurant = yield restaurant_1.default.create(newRestaurant);
        res.json(createdRestaurant);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.createRestaurant = createRestaurant;
const getRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_1.default.findById(req.params.id);
        if (!restaurant) {
            res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.getRestaurantById = getRestaurantById;
const updateRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRestaurant = yield restaurant_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRestaurant) {
            res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(updatedRestaurant);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
exports.updateRestaurantById = updateRestaurantById;
