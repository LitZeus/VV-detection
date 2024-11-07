import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Alert } from 'react-bootstrap';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    age: '',
    gender: '',
    city: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadUrl;

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      uploadUrl = 'http://192.168.31.178:5000/signup'; 
    } else {
      uploadUrl = 'http://localhost:5000/signup';
    }

    try {
      const response = await axios.post(uploadUrl, formData);
      console.log('Signup response:', response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      setErrorMessage(error.response.data.message); 
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center">Signup</h2>

        {errorMessage && ( 
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              required
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Enter your age"
              required
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              placeholder="Enter your gender"
              required
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter your city"
              required
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and numbers,
              and must not contain spaces, special characters, or emoji.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-2">
            Sign Up
          </Button>
          <Button variant="link" onClick={() => navigate('/login')} className="w-100">
            Already have an account? Log in
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
