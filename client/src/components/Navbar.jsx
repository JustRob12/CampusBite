import { FiArchive, FiBell, FiShoppingCart } from 'react-icons/fi'; // Changed to FiArchive
import { GiMeal } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../components/NotificationsProvider'; // Import notification context
import { useCart } from './CartProvider';

const Navbar = () => {
    const { cartCount } = useCart(); // Reactively get cart count
    const { notificationCount } = useNotification(); // Reactively get notification count
    const navigate = useNavigate();

    return (
        <nav className="bg-[#003366] text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                
                <div className="flex items-center space-x-6">
                    <Link to="/sfmenu" className="hover:text-gray-300">
                        <GiMeal size={28} />
                    </Link>
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative bg-white text-[#003366] p-2 rounded-full"
                    >
                        <FiShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => navigate('/notifications')}
                        className="relative bg-white text-[#003366] p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        <FiBell size={24} />
                        {notificationCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {notificationCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => navigate('/order-history')} // Navigate to the order history page
                        className="relative bg-white text-[#003366] p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                        <FiArchive size={24} /> {/* Use FiArchive as the history icon */}
                    </button>

                    
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
