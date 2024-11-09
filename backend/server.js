const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { auth, db } = require('./config/firebase');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { getDoc, setDoc, doc } = require('firebase/firestore');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/signup', async (req, res) => {
  const { email, password, phone, age, gender, city } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, 'users', userId), { phone, age, gender, city });
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    const userDoc = await getDoc(doc(db, 'users', userId));

    res.send({
      message: 'Login successful',
      user: userDoc.data(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).send({ message: 'Invalid credentials' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
