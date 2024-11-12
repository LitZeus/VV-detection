// backend/routes/authRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route (optional, if you have it)
router.post('/login', login);

module.exports = router;
