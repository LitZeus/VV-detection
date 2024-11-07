import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: '#282c34',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'relative',
            bottom: 0,
            width: '100%',
            zIndex: 100,
        },
        link: {
            color: 'white',
            textDecoration: 'none',
            margin: '0 15px',
            transition: 'color 0.3s',
        },
        linkHover: {
            color: '#61dafb',
        },
    };

    return (
        <footer style={styles.footer}>
            <Link to="/about" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}>
                About Us
            </Link>
            <Link to="/educational-resources" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}>
                Educational Resources
            </Link>
            <Link to="/contact" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}>
                Contact Us
            </Link>
            <Link to="/feedback" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}>
                Feedback
            </Link>
        </footer>
    );
};

export default Footer;
