import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

const CartProviders = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => setCartItems((prev) => [...prev, item]);

    const removeFromCart = (id) => 
        setCartItems((prev) => prev.filter((item) => item.id !== id));

    // Calculate cart count
    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProviders;
