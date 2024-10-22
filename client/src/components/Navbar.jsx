import axios from 'axios'; // Import axios for API call
import React, { useEffect, useState } from 'react';
import { FiBell, FiShoppingCart } from 'react-icons/fi'; // Cart and Notification icons
import { GiMeal } from 'react-icons/gi'; // Food icon for Menu
import { Link, useNavigate } from 'react-router-dom';
const APIURL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0); // State to store cart count
    const navigate = useNavigate();

    // Fetch the cart items count
    useEffect(() => {
        const fetchCartCount = async () => {
            const token = localStorage.getItem('token'); // Get JWT token

            try {
                const response = await axios.get(`${APIURL}/auth/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartCount(response.data.length); // Set cart count
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartCount();
    }, []);

    return (
        <nav className="bg-[#003366] text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-xl font-bold">My Food App</h1>

                {/* Icons Section */}
                <div className="flex items-center space-x-6">
                    {/* Menu Icon */}
                    <Link to="/sfmenu" className="hover:text-gray-300 transition duration-200">
                        <GiMeal size={28} />
                    </Link>

                    {/* Cart Icon with Badge */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative bg-white text-[#003366] p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        <FiShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Icon */}
                    <button
                        onClick={() => navigate('/notifications')}
                        className="bg-white text-[#003366] p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        <FiBell size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
