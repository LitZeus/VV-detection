import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    alert('Feedback submitted! Thank you.');
    setRating(null);
    setFeedback('');
  };

  const teamMembers = [
    { name: 'Tejas', role: 'Project Lead', image: '/images/john.jpg' },
    { name: 'Vedant', role: 'Developer', image: '/images/jane.jpg' },
    { name: 'Prabhajan', role: 'Tester', image: '/images/anna.jpg' },
    { name: 'Darshana', role: 'Designer', image: '/images/sam.jpg' }
  ];

  return (
    <div style={styles.container}>
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

      <section style={styles.section}>
        <h2>Contact Us</h2>
        <div style={styles.contactDetails}>
          <p style={styles.contactItem}><strong>Email:</strong> contact@varicosevein.com</p>
          <p style={styles.contactItem}><strong>Phone:</strong> +8080941773</p>
          <p style={styles.contactItem}><strong>Address:</strong> Nbn Sinhagad School of Engg, Pune-41</p>
        </div>
      </section>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default AboutUs;
