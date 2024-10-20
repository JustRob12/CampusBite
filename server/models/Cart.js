const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // or 'Faculty', depending on your use case
        required: true
    },
    foodItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
