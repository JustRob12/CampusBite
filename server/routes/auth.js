const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const router = express.Router();

// Register Admin
router.post('/admin/signup', async (req, res) => {
    const { name, facultyId, course, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, facultyId, course, username, password: hashedPassword });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
});

// Register Student
router.post('/student/signup', async (req, res) => {
    const { name, studentId, course, year, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ name, studentId, course, year, username, password: hashedPassword });
    await student.save();
    res.status(201).json({ message: 'Student created' });
});

// Register Faculty
router.post('/faculty/signup', async (req, res) => {
    const { name, facultyId, course, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const faculty = new Faculty({ name, facultyId, course, username, password: hashedPassword });
    await faculty.save();
    res.status(201).json({ message: 'Faculty created' });
});

// Unified Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check Admin
    let user = await Admin.findOne({ username });
    let role = 'admin'; // Default role

    if (!user) {
        // If not found as Admin, check for Faculty
        user = await Faculty.findOne({ username });
        role = 'faculty';
    }

    if (!user) {
        // If not found as Faculty, check for Student
        user = await Student.findOne({ username });
        role = 'student';
    }

    // If user not found or password does not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with role
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
    res.json({ token, user: { role } });
});

module.exports = router;
