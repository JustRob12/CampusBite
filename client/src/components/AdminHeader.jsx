// AdminHeader.jsx
import React from 'react';

const AdminHeader = ({ adminName }) => {
    const handleLogout = () => {
        // Clear local storage or perform logout action
        localStorage.removeItem('user');
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <header className="bg-[#003366] text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center">
                
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
