import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-[#003366] text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo (optional) */}
                <h1 className="text-xl font-bold">My Food App</h1>

                {/* Menu + Cart */}
                <div className="flex items-center space-x-6">
                    {/* Menu Button */}
                    <Link
                        to="/sfmenu"
                        className="text-white hover:text-gray-300 transition duration-200"
                    >
                        Menu
                    </Link>

                    {/* My Cart Button */}
                    <button
                        onClick={() => navigate('/cart')}
                        className="bg-white text-[#003366] px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        My Cart
                    </button>
                     {/* My Cart Button */}
                     <button
                        onClick={() => navigate('/notifications')}
                        className="bg-white text-[#003366] px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        Notifications
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
