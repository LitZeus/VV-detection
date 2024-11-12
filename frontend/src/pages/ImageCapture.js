import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ImageCapture.css';

function ImageCapture() {
  const [image, setImage] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null); // For referencing the video element directly
  const navigate = useNavigate();

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Function to handle camera access and image capture
  const handleCameraCapture = async () => {
    if (!isCamera) {
      // Clear the previous image when opening the camera
      setImage(null);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraStream(stream);
        setIsCamera(true);
      } catch (error) {
        console.error("Camera access error:", error);
      }
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const capturedImage = canvas.toDataURL('image/jpeg');
      setImage(capturedImage);

      // Stop the camera after capturing the image
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCamera(false);
    }
  };

  // Function to stop the camera manually
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCamera(false);
    }
  };

  // Hook to set the video stream to the video element
  useEffect(() => {
    if (isCamera && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [isCamera, cameraStream]);

  const handleSend = () => {
    // Handle sending the image to the backend or any other action here
    console.log('Sending image...', image);
    // You can make an API request or navigate to another page
  };

  // Function to remove the selected or captured image
  const handleDeleteImage = () => {
    setImage(null); // Clear the image state
  };

  return (
    <div className="hero d-flex flex-column min-vh-100">
      <div className="capture-or-upload-container flex-grow-1">
        <div className="card p-4">
          <h1 className="text-center">Varicose Veins Detection using YOLO</h1>
          <p className="text-center">Upload an image or take a picture using your camera.</p>

          <div className="option-buttons d-flex justify-content-center mt-4">
            {!isCamera ? (
              <button className="btn button-style open-camera-btn mx-2" onClick={handleCameraCapture}>
                Open Camera
              </button>
            ) : (
              <button className="btn button-style capture-image-btn mx-2" onClick={handleCameraCapture}>
                Capture Image
              </button>
            )}

            <label htmlFor="file-upload" className="btn button-style choose-image-btn mx-2">Choose Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              id="file-upload"
              style={{ display: 'none' }}
            />
          </div>

          {isCamera && (
            <div className="mt-4 text-center">
              {/* Video Element for live camera stream */}
              <video ref={videoRef} autoPlay width="100%" height="auto" />
              <button className="btn btn-danger mt-2" onClick={stopCamera}>Stop Camera</button>
            </div>
          )}

          {image && (
            <div className="mt-4 text-center">
              <h3>Selected Image</h3>
              <div className="image-container">
                <img src={image} alt="Captured or Uploaded" className="img-fluid" />
                <button className="btn btn-danger delete-image-btn" onClick={handleDeleteImage}>
                  <span className="delete-icon">×</span>
                </button>
              </div>
            </div>
          )}

          {/* Send Button, displayed when an image is selected or captured */}
          {image && (
            <div className="mt-4 text-center">
              <button className="btn btn-primary" onClick={handleSend}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center py-3"></footer>
    </div>
  );
}

export default ImageCapture;
