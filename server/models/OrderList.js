const mongoose = require('mongoose');

// Function to generate a random alphanumeric string of a given length
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const orderListSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // or 'Faculty', depending on your use case
        required: true
    },
    items: [
        {
            foodItemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FoodItem',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add a method to create a new order
// Add a method to create a new order
orderListSchema.statics.createOrder = async function (userId, items, totalPrice) {
    const orderId = generateRandomString(8); // Generate a random 8-character order ID
    console.log('Generated Order ID:', orderId); // Log the generated Order ID
    const newOrder = new this({
        orderId,
        userId,
        items,
        totalPrice
    });
    return await newOrder.save(); // Save the order
};


// Create the OrderList model
const OrderList = mongoose.model('OrderList', orderListSchema);

module.exports = OrderList;
