import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; // Import the Home component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Add this line for the root route */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
