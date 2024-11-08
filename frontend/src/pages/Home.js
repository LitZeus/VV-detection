import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="text-primary">Welcome to Varicose Veins Detection using YOLO</h1>
      <p className="lead">A Deep Learning Approach for Early Detection of Varicose Veins</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/signup" className="btn btn-outline-secondary mx-2">Signup</Link>
      </div>
      
      {/* Footer */}
      <footer className="mt-auto text-center py-3">
      </footer>
    </div>
  );
}

export default Home;
