import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

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
    let signupUrl;

    // Check if the app is running on mobile or desktop to choose the correct URL
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      signupUrl = 'http://192.168.31.178:5000/api/auth/signup';  // Change to the IP address of your local machine if testing on mobile
    } else {
      signupUrl = 'http://localhost:5000/api/auth/signup';  // For local testing
    }

    try {
      const response = await axios.post(signupUrl, formData);
      console.log('Signup response:', response.data);
      navigate('/login');  // Navigate to the login page after successful signup
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      // Display the error message from backend
      setErrorMessage(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <Container className="signup-container">
      <div className="signup-box">
        <h2>Signup</h2>

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
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
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
