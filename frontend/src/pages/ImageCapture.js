import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; // Import Footer
import '../styles/ImageCapture.css';

function ImageCapture() {
  const [image, setImage] = useState(null);
  const [isCamera, setIsCamera] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCameraCapture = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    video.oncanplay = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImage = canvas.toDataURL('image/jpeg');
      setImage(capturedImage);
      stream.getTracks().forEach(track => track.stop());
    };
  };

  return (
    <div className="capture-or-upload-container">
      <h1 className="text-center">Varicose Veins Detection using YOLO</h1>
      <div className="option-buttons d-flex justify-content-center mt-4">
        <button className="btn btn-primary mx-2" onClick={() => setIsCamera(true)}>Capture Image from Camera</button>
        <button className="btn btn-secondary mx-2" onClick={() => setIsCamera(false)}>Upload Image</button>
      </div>

      {isCamera ? (
        <div className="camera-section mt-4 text-center">
          <button className="btn btn-success" onClick={handleCameraCapture}>Capture Image</button>
        </div>
      ) : (
        <div className="upload-section mt-4 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="form-control-file"
          />
        </div>
      )}

      {image && (
        <div className="mt-4 text-center">
          <h3>Captured or Uploaded Image</h3>
          <img src={image} alt="Captured or Uploaded" className="img-fluid" />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ImageCapture;
