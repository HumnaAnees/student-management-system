// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Student = require('../models/Student');
// const router = express.Router();

// // 📝 Signup Route
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if student already exists
//     const existing = await Student.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash password and save student
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newStudent = new Student({ name, email, password: hashedPassword });
//     await newStudent.save();

//     res.status(201).json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error during signup' });
//   }
// });

// // 🔐 Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// module.exports = router;
