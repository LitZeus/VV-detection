// login.js

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; // Import Firebase auth and Google provider
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Email & Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful');
        navigate('/Profile'); // Navigate to Profile on success
      } catch (error) {
        console.error(error.message);
        alert('Failed to login. Please check your credentials.');
      }
    } else {
      alert('Please fill in both fields!');
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('Google login successful');
      navigate('/Profile'); // Navigate to Profile on success
    } catch (error) {
      console.error(error.message);
      alert('Failed to login with Google');
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="login-box">
        <h2 className="text-center mt-4">Login to Your Account</h2>
        <form onSubmit={handleEmailLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <button
          className="btn btn-danger w-100 mt-3"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>

        {/* Sign up */}
        <Button
          variant="link"
          onClick={() => navigate('/signup')}
          className="w-100 mt-3"
        >
          Don't have an account? Sign up
        </Button>
      </div>
    </div>
  );
}

export default Login;
