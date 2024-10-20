const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, enum: ['Meal', 'Snack', 'Drink'], required: true },
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
