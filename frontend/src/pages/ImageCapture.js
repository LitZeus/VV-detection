import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ImageCapture.css';

function ImageCapture() {
  const [image, setImage] = useState(null);
  const [isCamera, setIsCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCameraCapture = async () => {
    if (!cameraStream) {
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
        setCameraStream(null);
      };

      setCameraStream(stream);
    }
  };

  return (
    <div className="hero d-flex flex-column min-vh-100">
      <div className="capture-or-upload-container flex-grow-1">
        <div className="card p-4">
          <h1 className="text-center">Varicose Veins Detection using YOLO</h1>
          <p className="text-center">Upload an image or take a picture using your camera.</p>
          
          <div className="option-buttons d-flex justify-content-center mt-4">
            <button className="btn button-style open-camera-btn mx-2" onClick={handleCameraCapture}>
              {cameraStream ? 'Stop Camera & Capture Image' : 'Open Camera'}
            </button>
            <label htmlFor="file-upload" className="btn button-style choose-image-btn mx-2">Choose Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              id="file-upload"
              style={{ display: 'none' }}
            />
          </div>

          {image && (
            <div className="mt-4 text-center">
              <h3>Captured or Uploaded Image</h3>
              <img src={image} alt="Captured or Uploaded" className="img-fluid" />
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-auto text-center py-3">
      </footer>
    </div>
  );
}

export default ImageCapture;
