import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation (you can replace with real API validation)
    if (email && password) {
      // On successful login, navigate to Profile
      navigate('/Profile');
    } else {
      alert("Please fill in both fields!");
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="login-box">
        <h2 className="text-center mt-4">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        
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
