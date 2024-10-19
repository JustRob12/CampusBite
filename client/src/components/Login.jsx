import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Attempt to log in the user
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);

            // Assuming the response contains the user object with a role
            const { role } = response.data.user; // Ensure your API returns the user's role

            // Redirect based on the user's role
            window.location.href = role === 'admin' ? '/admin/dashboard' : '/dashboard';
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
