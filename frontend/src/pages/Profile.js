import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [previousRecords, setPreviousRecords] = useState([]);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }

    // Simulate fetching previous records (or fetch from API if available)
    const records = [
      { id: 1, date: '2023-10-01', result: 'Normal' },
      { id: 2, date: '2023-09-21', result: 'Mild Issues' },
      // Add more records as needed
    ];
    setPreviousRecords(records);
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h2 className="mb-4">Profile</h2>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title>Personal Information</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Username:</strong> {userDetails.username}</ListGroup.Item>
            <ListGroup.Item><strong>Phone:</strong> {userDetails.phone}</ListGroup.Item>
            <ListGroup.Item><strong>Age:</strong> {userDetails.age}</ListGroup.Item>
            <ListGroup.Item><strong>Gender:</strong> {userDetails.gender}</ListGroup.Item>
            <ListGroup.Item><strong>City:</strong> {userDetails.city}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <h3 className="mt-5">Previous Records</h3>
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <Card.Body>
          {previousRecords.length === 0 ? (
            <p>No previous records found.</p>
          ) : (
            <ListGroup variant="flush">
              {previousRecords.map(record => (
                <ListGroup.Item key={record.id}>
                  <strong>Date:</strong> {record.date} - <strong>Result:</strong> {record.result}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
