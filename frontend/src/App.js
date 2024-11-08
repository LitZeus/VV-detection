import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImageCapture from './pages/ImageCapture';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/image-capture" element={<ImageCapture />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
