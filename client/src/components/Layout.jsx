// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // To render child routes
import Header from './Header'; // Import your Header component
import Navbar from './Navbar'; // Import your Navbar component

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header /> {/* Header at the top */}
            <Navbar /> {/* Navbar right under the Header */}
            
            {/* Main content area */}
            <main className="flex-grow p-8">
                <Outlet /> {/* Renders the nested route (like Dashboard or AdminDashboard) */}
            </main>
        </div>
    );
};

export default Layout;
