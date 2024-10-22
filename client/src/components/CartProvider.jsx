// CartProvider.jsx
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const APIURL = import.meta.env.VITE_API_URL;

    // Update cart count based on the current items
    const updateCartCount = (items) => {
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalQuantity);
    };

    // Fetch cart items and update the count
    const fetchCartItems = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${APIURL}/auth/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data);
            updateCartCount(response.data);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    // Add item to cart
    const addToCart = async (foodItemId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                `${APIURL}/auth/cart/add`,
                { foodItemId, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCartItems(); // Refresh cart count
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    // Remove item from cart
    const removeFromCart = async (cartItemId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${APIURL}/auth/cart/${cartItemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCartItems(); // Refresh cart count
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    // Handle quantity updates for specific items
    const updateQuantity = async (cartItemId, increment = true) => {
        const token = localStorage.getItem('token');
        const endpoint = increment
            ? `${APIURL}/auth/cart/increment/${cartItemId}`
            : `${APIURL}/auth/cart/decrement/${cartItemId}`;

        try {
            await axios.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
            fetchCartItems(); // Refresh cart count
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    // Fetch cart items when the component mounts
    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
