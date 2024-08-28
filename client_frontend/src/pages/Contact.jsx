import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailClick = () => {
        const mailtoLink = `mailto:vmcsachin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
        window.location.href = mailtoLink;
    };

    return (
        <Container className="my-5" style={{ color: 'white' }}>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Card bg="dark" text="white" className="shadow-lg p-3" style={{ fontSize: '1.1rem' }}>
                        <Card.Body>
                            <Card.Title className="display-4">Contact Us</Card.Title>
                            <Card.Text>
                                <p>
                                    If you have any questions, feedback, or need support, feel free to reach out to us. We're here to help!
                                </p>
                                <Form>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Your Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formSubject" className="mt-3">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formMessage" className="mt-3">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Write it here"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="primary"
                                        onClick={handleEmailClick}
                                        style={{ fontSize: '1.2rem' }}
                                        className="mt-3">
                                        Send Email
                                    </Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
