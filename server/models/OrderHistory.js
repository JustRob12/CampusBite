// models/OrderHistory.js
const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming you have a User model
    },
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Notification', // Reference to the Notification model
    },
    foodItemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FoodItem', // Reference to the FoodItem model
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity
    },
    price: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('OrderHistory', OrderHistorySchema);
