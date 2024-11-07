const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/patients', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true},
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  password: { type: String, required: true }
});


const User = mongoose.model('User', userSchema);

const JWT_SECRET = 'your_jwt_secret';

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/signup', async (req, res) => {
  const { username, phone, age, gender, city, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username already exists' });
    }

    // Check if the phone number already exists
    const existingPhoneUser = await User.findOne({ phone });
    if (existingPhoneUser) {
      return res.status(400).send({ message: 'Phone number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, phone, age, gender, city, password: hashedPassword });
    await newUser.save();

    res.send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).send({ message: 'Duplicate field value entered' });
    }
    res.status(500).send({ message: 'Internal server error' });
  }
});



app.post('/login', async (req, res) => {
  const { username, password } = req.body;  

  // Find user by username
  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  // Check if password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(400).send({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Respond with message, token, and user details
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
});



app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  try {
    console.log('File uploaded:', req.file);
    res.send({ message: 'Image uploaded successfully!', file: req.file });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send({ message: 'Upload failed', error });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
