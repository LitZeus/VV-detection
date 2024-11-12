// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { username, phone, age, gender, city, password } = req.body;

  try {
    // Check if username or phone already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send({ message: 'Username already exists' });

    const existingPhoneUser = await User.findOne({ phone });
    if (existingPhoneUser) return res.status(400).send({ message: 'Phone number already exists' });

    // Hash the password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, phone, age, gender, city, password: hashedPassword });
    await newUser.save();

    res.send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) return res.status(400).send({ message: 'Duplicate field value entered' });
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send({ message: 'Invalid password' });

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.send({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        city: user.city
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
