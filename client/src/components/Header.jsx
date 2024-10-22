import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; // Import Radix UI Dropdown Menu
import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi'; // Import profile icon
import { useNavigate } from 'react-router-dom'; // For Logout handling

const Header = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user info from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(user.name); // Display the user's name
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear all data on logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="bg-[#003366] text-white flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Campus Bite</h1>
            <div className="flex items-center space-x-4">
                <span className="text-lg">{userName}</span>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="focus:outline-none">
                            <FiUser size={24} /> {/* Profile icon */}
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
                        <DropdownMenu.Item
                            className="py-2 px-4 border-b hover:bg-gray-200 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </header>
    );
};

export default Header;
