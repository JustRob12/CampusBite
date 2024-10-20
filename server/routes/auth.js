const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const FoodItem = require('../models/FoodItem');
const Cart = require('../models/Cart'); // Make sure to require the Cart model
const OrderList = require('../models/OrderList');
const Notification = require('../models/Notification'); 
const router = express.Router();



// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting 'Bearer <token>'
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store decoded user info in request
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Register Admin
router.post('/admin/signup', async (req, res) => {
    const { name, facultyId, course, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, facultyId, course, username, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
});

// Register Student
router.post('/student/signup', async (req, res) => {
    const { name, studentId, course, year, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, studentId, course, year, username, password: hashedPassword });
    await student.save();
    res.status(201).json({ message: 'Student created' });
});

// Register Faculty
router.post('/faculty/signup', async (req, res) => {
    const { name, facultyId, course, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const faculty = new Faculty({ name, facultyId, course, username, password: hashedPassword });
    await faculty.save();
    res.status(201).json({ message: 'Faculty created' });
});

// Unified Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check Admin
    let user = await Admin.findOne({ username });
    let role = 'admin'; // Default role

    if (!user) {
        // If not found as Admin, check for Faculty
        user = await Faculty.findOne({ username });
        role = 'faculty';
    }

    if (!user) {
        // If not found as Faculty, check for Student
        user = await Student.findOne({ username });
        role = 'student';
    }

    // If user not found or password does not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with role
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);

    // Respond with token, role, and user name
    res.json({ 
        token, 
        user: { role, name: user.name } 
    });

 
   

    router.post('/items/add', async (req, res) => {
        const { name, description, price, quantity, category } = req.body;
    
        try {
            const newItem = new FoodItem({ name, description, price, quantity, category });
            await newItem.save();
            res.status(201).json({ message: 'Item added successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding item' });
        }
    });

  // Get all food items (protected route)
router.get('/items', verifyToken, async (req, res) => {
    try {
        const items = await FoodItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items' });
    }

    
});

// Add an item to the cart
// Add an item to the cart or increment quantity if it already exists
router.post('/cart/add', verifyToken, async (req, res) => {
    const { foodItemId, quantity } = req.body;
    const userId = req.user.id; // Get user ID from decoded token

    try {
        // Check if the item already exists in the cart for this user
        const existingCartItem = await Cart.findOne({ userId, foodItemId });

        if (existingCartItem) {
            // Item exists, increment quantity
            existingCartItem.quantity += quantity; // You can choose to set this to 1 if you want
            await existingCartItem.save();
            return res.status(200).json({ message: 'Item quantity updated in cart successfully!' });
        } else {
            // Create a new cart item
            const cartItem = new Cart({ userId, foodItemId, quantity });
            await cartItem.save();
            return res.status(201).json({ message: 'Item added to cart successfully!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});


// Get user's cart items
router.get('/cart', verifyToken, async (req, res) => {
    const userId = req.user.id; // Get user ID from decoded token

    try {
        const cartItems = await Cart.find({ userId })
            .populate('foodItemId', 'name price') // Populate only the necessary fields
            .exec();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart items' });
    }
});

// Increment quantity of cart item
router.put('/cart/increment/:id', verifyToken, async (req, res) => {
    const cartItemId = req.params.id;

    try {
        // Find the cart item and increment the quantity
        const cartItem = await Cart.findByIdAndUpdate(
            cartItemId,
            { $inc: { quantity: 1 } },
            { new: true } // Return the updated document
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Quantity updated successfully!', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item quantity' });
    }
});

// Delete cart item
router.delete('/cart/:id', verifyToken, async (req, res) => {
    const cartItemId = req.params.id;

    try {
        const deletedItem = await Cart.findByIdAndDelete(cartItemId);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart item' });
    }
});

// Decrement quantity of cart item
router.put('/cart/decrement/:id', verifyToken, async (req, res) => {
    const cartItemId = req.params.id;

    try {
        // Find the cart item
        const cartItem = await Cart.findById(cartItemId);

        // If cart item not found, return an error
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Check if quantity is greater than 1 before decrementing
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1; // Decrement quantity
            await cartItem.save(); // Save updated cart item
            return res.status(200).json({ message: 'Quantity decremented successfully!', cartItem });
        } else {
            // If quantity is 1, you might want to delete it instead
            await Cart.findByIdAndDelete(cartItemId);
            return res.status(200).json({ message: 'Cart item deleted as quantity reached zero.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error decrementing cart item quantity' });
    }
});

router.post('/order', verifyToken, async (req, res) => {
    const { items } = req.body; // Get items from the request body
    const userId = req.user.id; // Get user ID from token

    const totalPrice = items.reduce((total, item) => total + (item.foodItemId.price * item.quantity), 0); // Calculate total price

    try {
        const newOrder = await OrderList.createOrder(userId, items, totalPrice); // Create the order
        // Delete all items in the cart for the user
        await Cart.deleteMany({ userId: userId });

        res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder.orderId });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order' });
    }
});


// Route to get all orders
router.get('/orders', verifyToken, async (req, res) => {
    try {
        // Fetch orders with populated user and food item data
        const orders = await OrderList.find()
            .populate('userId', 'name') // Populate userId to get user name
            .populate('items.foodItemId', 'name price'); // Populate foodItemId to get item details
        
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
});


// POST /api/auth/notify
router.post('/notify', verifyToken, async (req, res) => {
    const { orderId, userId } = req.body; // Extract orderId and userId from the request body

    try {
        const notification = new Notification({
            userId,
            orderId,
            message: `Your order ${orderId} is ready!`,
        });

        await notification.save(); // Save notification to the database
        res.status(201).json({ message: 'Notification sent successfully!' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Failed to send notification' });
    }
});

// Route to fetch notifications for a specific user
router.get('/notifications', verifyToken, async (req, res) => {
    const { id: userId } = req.user; // Extract user ID from token

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Fetch notifications for user
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications' });
    }
});

// routes/auth.js

// routes/auth.js

router.delete('/orders/:orderId', verifyToken, async (req, res) => {
    const { orderId } = req.params;

    try {
        const deletedOrder = await OrderList.findOneAndDelete({ orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order' });
    }
});

router.delete('/notifications/:id', async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Failed to delete notification' });
    }
});

// DELETE route to delete a food item by ID
router.delete('/items/:id', async (req, res) => {
    try {
        console.log('Deleting item with ID:', req.params.id);

        const item = await FoodItem.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Delete Error:', error);
        res.status(500).json({ message: 'Server error while deleting the item' });
    }
});


router.put('/items/:id', async (req, res) => {
    try {
        console.log('Editing item with ID:', req.params.id);

        const updatedItem = await FoodItem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Edit Error:', error);
        res.status(500).json({ message: 'Server error while updating the item' });
    }
});






});

module.exports = router;
