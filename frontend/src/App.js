import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';  
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>

    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
