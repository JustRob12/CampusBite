import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const APIURL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${APIURL}/auth/login`, { 
                username, 
                password 
            });

            // Store both token and user info in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user object

            const { role } = response.data.user;
            navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-center text-3xl font-bold text-[#003366] mb-2">Welcome to Campus Bite!</h1>
                <h2 className="text-center text-xl text-gray-600 mb-6">Fill up the form to proceed</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#003366] text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
                        onClick={() => navigate('/signup')}
                    >
                        Go to Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
