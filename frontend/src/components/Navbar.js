import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Centering the Brand Name */}
        <div className="d-flex justify-content-center w-100">
          <Link className="navbar-brand" to="/Home">
            Varicose Detection
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
