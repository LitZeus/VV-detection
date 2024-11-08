import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Varicose Veins Detection
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/aboutus" element={<AboutUs />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
