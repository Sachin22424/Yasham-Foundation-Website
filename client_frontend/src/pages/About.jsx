import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="my-5" style={{ color: 'white' }}>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Card bg="dark" text="white" className="shadow-lg p-3" style={{ fontSize: '1.1rem' }}>
                        <Card.Body>
                        <Card.Title className="display-4 mb-4" style={{ textAlign: 'center' }}>About Chit Chat</Card.Title>
                            <Card.Text>
                                <p>
                                    <strong>Chit Chat</strong> is a real-time chat application designed to provide users with a seamless and interactive communication experience. Whether you're chatting with friends, family, or colleagues, Chit Chat offers a robust and user-friendly platform to stay connected.
                                </p>
                                <p>
                                    <strong>Key Features:</strong>
                                </p>
                                <ul>
                                    <li>Real-time messaging with instant delivery.</li>
                                    <li>User authentication for secure access.</li>
                                    <li>Chat rooms for group conversations.</li>
                                    <li>Responsive design for optimal use on any device.</li>
                                </ul>
                                <p>
                                    <strong>Technology Stack:</strong>
                                </p>
                                <ul>
                                    <li><strong>Frontend:</strong> React, Bootstrap, CSS</li>
                                    <li><strong>Backend:</strong> Node.js, Express</li>
                                    <li><strong>Database:</strong> MongoDB</li>
                                    <li><strong>Real-time Communication:</strong> Socket.io</li>
                                </ul>
                                <p>
                                    Developed with a focus on performance, security, and user experience, Chit Chat aims to be the go-to solution for all your real-time communication needs.
                                </p>
                                <p>
                                    <strong>Project Description:</strong>
                                </p>
                                <ul>
                                    <li>Tech Stack: React, Bootstrap, Node.js, MongoDB, Socket.io</li>
                                    <li>Developed a real-time chat application for frontend UI using React, Bootstrap, and CSS.</li>
                                    <li>Utilised Node.js and Express for the backend to handle user authentication, message routing, and chat room management.</li>
                                    <li>Implemented real-time communication features using Socket.io, enabling users to send and receive messages instantly.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
