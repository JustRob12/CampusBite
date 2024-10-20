import React, { useEffect, useState } from 'react';
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
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
