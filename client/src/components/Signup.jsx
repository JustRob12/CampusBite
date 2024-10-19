import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // 'student' or 'faculty'

    const handleSignup = async (e) => {
    e.preventDefault();
    const endpoint = role === 'student' 
        ? 'http://localhost:5000/api/auth/student/signup' 
        : 'http://localhost:5000/api/auth/faculty/signup'; // Update the port as necessary
    const data = role === 'student' 
        ? { name, studentId, course, year, username, password } 
        : { name, facultyId: studentId, course, username, password };
    
    try {
        await axios.post(endpoint, data);
        // Redirect to login or another page
        window.location.href = '/login';
    } catch (error) {
        console.error(error);
    }
};
    return (
        <form onSubmit={handleSignup}>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
            </select>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={role === 'student' ? "Student ID" : "Faculty ID"} onChange={(e) => setStudentId(e.target.value)} />
            <input type="text" placeholder="Course" onChange={(e) => setCourse(e.target.value)} />
            {role === 'student' && <input type="text" placeholder="Year" onChange={(e) => setYear(e.target.value)} />}
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
