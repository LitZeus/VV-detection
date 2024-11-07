import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    let uploadUrl;

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      uploadUrl = 'http://192.168.31.178:5000/upload'; 
    } else {
      uploadUrl = 'http://localhost:5000/upload';
    }

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
      setMessage(response.data.message); 
      setError(''); 
    } catch (error) {
      console.error('Error uploading image:', error);
      setError(error.response?.data?.message || 'Error uploading image. Please try again.');
      setMessage(''); 
    }
  };

  const uploadBoxStyle = {
    border: '2px dashed #007bff', 
    borderRadius: '15px', 
    padding: '20px', 
    width: '100%', 
    maxWidth: '400px', 
    margin: '0 auto',
    backgroundColor: '#f8f9fa', 
    transition: 'background-color 0.3s', 
    textAlign: 'center', 
  };

  const uploadBoxHoverStyle = {
    ...uploadBoxStyle,
    backgroundColor: '#e9ecef', 
  };

  const uploadInputStyle = {
    display: 'none', 
  };

  const selectedFileNameStyle = {
    marginTop: '10px', 
    color: '#007bff', 
    fontWeight: 'bold', 
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Upload Image</h2>
      <Form className="text-center">
        <Form.Group controlId="formFile" className="mb-4">
          <Form.Label>Select an image to upload</Form.Label>
          <div
            style={uploadBoxStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = uploadBoxHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = uploadBoxStyle.backgroundColor)}
            onClick={() => document.getElementById('fileInput').click()} 
          >
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={uploadInputStyle}
              id="fileInput"
            />
            {selectedFile && (
              <p style={selectedFileNameStyle}>{selectedFile.name}</p>
            )}
            <span style={{ color: '#6c757d', fontWeight: 'bold' }}>
              Drag and drop your image here or click to select
            </span>
          </div>
        </Form.Group>
        <Button variant="primary" onClick={handleUpload} className="w-100">
          Upload Image
        </Button>
      </Form>

      {/* Success and error messages */}
      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default ImageUpload;
