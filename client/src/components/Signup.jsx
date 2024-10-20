import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    const handleSignup = async (e) => {
        e.preventDefault();
        const endpoint = role === 'student' 
            ? 'http://localhost:5000/api/auth/student/signup' 
            : 'http://localhost:5000/api/auth/faculty/signup';
        const data = role === 'student' 
            ? { name, studentId, course, year, username, password } 
            : { name, facultyId: studentId, course, username, password };
        
        try {
            await axios.post(endpoint, data);
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-[28rem]">
                <h1 className="text-center text-2xl font-bold text-[#003366] mb-2">Welcome to Campus Bite!</h1>
                <h2 className="text-center text-lg text-gray-600 mb-4">Fill up the form to proceed</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <select 
                        className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">User</option>
                   
                    </select>

                    {/* Name and ID Fields Side-by-Side */}
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder={role === 'student' ? "ID" : "Faculty ID"}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                        />
                    </div>

                    {/* Course and Year Fields Side-by-Side */}
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                            placeholder="Course"
                            onChange={(e) => setCourse(e.target.value)}
                            required
                        />
                        {role === 'student' && (
                            <input
                                type="text"
                                className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                                placeholder="Year"
                                onChange={(e) => setYear(e.target.value)}
                             
                            />
                        )}
                    </div>

                    <input
                        type="text"
                        className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#003366] text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
                        onClick={() => (window.location.href = '/login')}
                    >
                        Go to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
