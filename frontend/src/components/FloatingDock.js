import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

export function FloatingDockDemo() {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleLogout = () => {
    // Clear local storage items
    localStorage.removeItem('userDetails');
    localStorage.removeItem('LoginDetails');
    localStorage.removeItem('token');
    
    // Navigate to login page
    navigate('/login');
  };

  const links = [
    { title: 'Home', icon: <FaHome />, href: '/home' }, // Home page
    { title: 'Profile', icon: <FaUser />, href: '/profile' }, // Profile page
    { title: 'About Us', icon: <FaInfoCircle />, href: '/aboutus' }, // About Us page
    { title: 'Logout', icon: <FaSignOutAlt />, onClick: handleLogout ,href:'/'} // Logout with handleLogout function
  ];

  return (
    <div className="d-flex justify-content-center" style={{ height: '35rem', width: '100%' }}>
      <Navbar fixed="bottom" className="bg-light justify-content-around py-3" style={{ width: '100%' }}>
        <Nav>
          {links.map((link, index) => (
            <Nav.Link 
              key={index} 
              as={Link}  // Use React Router's Link for navigation
              to={link.href} // Specify the route to navigate to
              onClick={link.onClick ? link.onClick : null} // Handle logout click
              className="d-flex flex-column align-items-center"
              style={{
                transition: 'transform 0.2s', // Smooth transition for hover effects
                padding: '1rem', // Increased padding for the link
                fontSize: '1rem', // Decreased font size
                textAlign: 'center', // Center align text
                color: 'inherit' // Inherit color from parent to avoid blue on click
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'; // Slight increase in size on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Reset size on mouse leave
              }}
            >
              <div className="text-secondary" style={{ fontSize: '1.5rem' }}>
                {link.icon}
              </div>
              <div className="mt-1" style={{ fontSize: '1rem' }}>{link.title}</div>
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
}
