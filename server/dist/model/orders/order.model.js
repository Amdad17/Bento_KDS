"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
    ingredientName: { type: String, required: true },
    unitOfStock: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPerUnit: { type: Number, required: true },
    caloriesPerUnit: { type: Number, required: true },
});
const categorySchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
});
const packingSchema = new mongoose_1.Schema({
    dimensionLength: { type: Number, required: true },
    dimensionWidth: { type: Number, required: true },
    dimensionHeight: { type: Number, required: true },
});
const itemSchema = new mongoose_1.Schema({
    restaurantId: { type: Number, required: true },
    categoryId: { type: Number, required: true },
    item: {
        itemId: { type: Number, required: true },
        itemName: { type: String, required: true },
        itemImage: { type: String },
        itemQuantity: { type: Number, required: true },
        itemPreparationTime: { type: Number, required: true },
        itemPackingType: { type: String, required: true },
        itemPackingDimension: packingSchema,
        itemLastingTime: { type: Number, required: true }, //needed for marketplace
        itemPortionSize: { type: String, required: true },
        ingredients: [ingredientSchema],
        options: {
            type: {
                add: [
                    {
                        quantity: { type: Number, required: true },
                        ingredientName: { type: String, required: true },
                        ingredient: ingredientSchema,
                    },
                ],
                no: [
                    {
                        quantity: { type: Number, required: true },
                        ingredientName: { type: String, required: true },
                        ingredient: ingredientSchema,
                    },
                ],
            },
            required: true
        },
        chosenOptions: {
            type: {
                add: [
                    {
                        quantity: { type: Number, required: true },
                        ingredientName: { type: String, required: true },
                        ingredient: ingredientSchema,
                    },
                ],
                no: [
                    {
                        quantity: { type: Number, required: true },
                        ingredientName: { type: String, required: true },
                        ingredient: ingredientSchema,
                    },
                ],
            },
        },
        optionalNotes: { type: String },
        discount: { type: Number, required: true },
        isDisabled: { type: Boolean, required: true },
        itemPrice: { type: Number, required: true },
        itemCalories: { type: Number, required: true },
        timeOfDay: { type: [String], required: true },
        itemProfileTastyTags: { type: [String], required: true },
        typeOfFoods: { type: [String], required: true },
        servingTemperature: { type: Number, required: true },
        itemDietaryRestrictions: { type: [String], required: true },
    },
});
const orderItemSchema = new mongoose_1.Schema({
    restaurantId: { type: Number, required: true },
    orderId: { type: String, required: true },
    categories: [{ type: categorySchema }],
    orderType: { type: String, required: true },
    vipCustomer: { type: Boolean, required: true },
    tableId: { type: String },
    deliveryServiceArriveTime: { type: Date },
    items: [{ type: itemSchema }],
    createdAt: { type: Date, required: true },
    preparingTimestamp: { type: Date },
    readyTimestamp: { type: Date },
    servedTimestamp: { type: Date },
    status: {
        type: String,
        required: true,
        enum: ["pending", "preparing", "ready", "complete"],
    },
    chef: { type: Object },
});
const Orders = (0, mongoose_1.model)("orders", orderItemSchema);
exports.default = Orders;
