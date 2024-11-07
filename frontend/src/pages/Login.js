import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Alert } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let uploadUrl;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      uploadUrl = 'http://192.168.31.178:5000/login';
    } else {
      uploadUrl = 'http://localhost:5000/login';
    }

    try {
      const response = await axios.post(uploadUrl, { username, password });
      const { message, token, user } = response.data;

      setMessage(message);
      localStorage.setItem('token', token);

      localStorage.setItem('userDetails', JSON.stringify(user));

      setUsername('');
      setPassword('');

      navigate('/home'); 
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred during login.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-2">
            Login
          </Button>
          <Button variant="link" onClick={() => navigate('/signup')} className="w-100">
            Don't have an account? Sign up
          </Button>
        </Form>

        {message && ( 
          <Alert variant={message.includes('error') ? 'danger' : 'success'} className="mt-3 text-center">
            {message}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default Login;
