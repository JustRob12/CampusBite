import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token

            try {
                const response = await axios.get('http://localhost:5000/api/auth/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token to the request
                    },
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load cart items');
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Function to handle adding quantity
    const handleAddQuantity = async (cartItemId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(
                `http://localhost:5000/api/auth/cart/increment/${cartItemId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update local cartItems state
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } catch (error) {
            console.error('Error updating quantity', error);
        }
    };

    // Function to handle decrementing quantity
    const handleDecrementQuantity = async (cartItemId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(
                `http://localhost:5000/api/auth/cart/decrement/${cartItemId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update local cartItems state
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
                )
            );
        } catch (error) {
            console.error('Error decrementing quantity', error);
        }
    };

    // Function to handle removing item
    const handleDeleteItem = async (cartItemId) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:5000/api/auth/cart/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update local cartItems state
            setCartItems((prevItems) => prevItems.filter((item) => item._id !== cartItemId));
        } catch (error) {
            console.error('Error deleting cart item', error);
        }
    };

  // In your Cart component
  const handleBuyNow = async () => {
    const token = localStorage.getItem('token');

    // Decode the JWT token to get the user name
    const userPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get payload
    const userName = userPayload.name; // Adjust according to your JWT structure

    try {
        const response = await axios.post(
            'http://localhost:5000/api/auth/order', // Your updated order endpoint
            { 
                items: cartItems, 
                userName // Send userName in the order request
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setCartItems([]); // Clear the cart after order placement
        alert(`Order placed successfully! Your Order ID is ${response.data.orderId}`); // Notify user of success
    } catch (error) {
        console.error('Error placing order', error);
        alert('Failed to place order. Please try again.'); // Notify user of failure
    }
};



    // Calculate total price
    const totalAmount = cartItems.reduce((total, item) => {
        return total + item.foodItemId.price * item.quantity;
    }, 0);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold">Cart Items</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul className="mt-4 space-y-2">
                    {cartItems.map((cartItem) => (
                        <li key={cartItem._id} className="border rounded-lg p-4 shadow-md flex justify-between items-center">
                            <span>{cartItem.foodItemId.name}</span> {/* Accessing food item name */}
                            <span>₱{cartItem.foodItemId.price}</span> {/* Accessing food item price */}
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleDecrementQuantity(cartItem._id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    disabled={cartItem.quantity <= 1} // Disable if quantity is 1 or less
                                >
                                    -
                                </button>
                                <span className="mx-2">Quantity: {cartItem.quantity}</span> {/* Display quantity */}
                                <button
                                    onClick={() => handleAddQuantity(cartItem._id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(cartItem._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ₱{totalAmount.toFixed(2)}</h3> {/* Display total amount */}
                <button
                    onClick={handleBuyNow}
                    className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    disabled={cartItems.length === 0} // Disable if cart is empty
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default Cart;
