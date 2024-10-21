import axios from 'axios';
import React, { useState } from 'react';
const APIURL = import.meta.env.VITE_API_URL;

const SignupAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        facultyId: '',
        course: '',
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${APIURL}/auth/admin/signup`, formData);
            setSuccess(response.data.message);
            setFormData({
                name: '',
                facultyId: '',
                course: '',
                username: '',
                password: '',
            });
        } catch (err) {
            setError(err.response?.data.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Faculty ID:</label>
                    <input type="text" name="facultyId" value={formData.facultyId} onChange={handleChange} required />
                </div>
                <div>
                    <label>Course:</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} required />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SignupAdmin;
