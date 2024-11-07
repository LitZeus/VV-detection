import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const AboutUs = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    alert('Feedback submitted! Thank you.');
    // Reset feedback form
    setRating(null);
    setFeedback('');
  };

  const teamMembers = [
    { name: 'Tejas', role: 'Project Lead', image: '/images/john.jpg' },
    { name: 'Vedant', role: 'Developer', image: '/images/jane.jpg' },
    { name: 'Prabhajan', role: 'Tester', image: '/images/anna.jpg' },
    { name: 'Darshana', role: 'Designer', image: '/images/sam.jpg' }
  ];

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    },
    section: {
      marginBottom: '2rem',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      marginBottom: '1rem',
    },
    ratingContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
    },
    star: {
      cursor: 'pointer',
      transition: 'color 200ms',
    },
    textArea: {
      width: '100%',
      padding: '0.5rem',
      borderRadius: '5px',
      border: '1px solid #ddd',
      marginBottom: '1rem',
    },
    submitButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    contactDetails: {
      textAlign: 'center',
    },
    contactItem: {
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      {/* About Us Section */}
      <section style={styles.section}>
        <h2>About Us</h2>
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.card}>
              <img src={member.image} alt={member.name} style={styles.profileImage} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section style={styles.section}>
        <h2>Feedback</h2>
        <div style={styles.ratingContainer}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <FaStar
                key={i}
                size={30}
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                style={styles.star}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>
        <textarea
          placeholder="Leave your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={styles.textArea}
        />
        <button style={styles.submitButton} onClick={handleFeedbackSubmit}>
          Submit
        </button>
      </section>

      {/* Contact Us Section */}
      <section style={styles.section}>
        <h2>Contact Us</h2>
        <div style={styles.contactDetails}>
          <p style={styles.contactItem}><strong>Email:</strong> contact@varicosevein.com</p>
          <p style={styles.contactItem}><strong>Phone:</strong> +8080941773</p>
          <p style={styles.contactItem}><strong>Address:</strong> Nbn Sinhagad School of Engg,Pune-41</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
