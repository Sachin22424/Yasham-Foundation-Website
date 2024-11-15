import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'; // Added Button import
import '../assets/Contact.css'; // Custom styling for Contact component
import mail from '../assets/email_b.png';
import call from '../assets/phone_b.png';
import insta from '../assets/insta_b.png';
import fb from '../assets/fb_b.png';
import linkedin from '../assets/ld_b.png';

const Contact = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);

    const handleMailTo = (e) => {
        const form = e.currentTarget;
        e.preventDefault(); // Prevent form submission
        if (form.checkValidity() === false) {
            setValidated(true); // Set validated to true so feedback messages appear
            return;
        }

        // If validation is successful, prepare mailto link
        const mailtoLink = `mailto:yashamfoundation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0APhone: ${encodeURIComponent(phone)}`;
        window.location.href = mailtoLink;
    };

    return (
        <Container className="contact-page py-5">
            <Row>
                <Col md={6}>
                    <Card className="contact-info-card p-4" style={{ backgroundColor: '#fafafa', border: 'none' }}>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>
                                Contact <span style={{ fontWeight: '700' }}>Information</span>
                            </h1>
                            <a href="mailto:yashamfoundation@gmail.com" className="d-flex align-items-center text-decoration-none mt-4">
                                <img src={mail} alt="email icon" className='icon' />
                                <p className="mb-0 mx-2 txt">yashamfoundation@gmail.com</p>
                            </a>
                            <a href="tel:+91-9817545817" className="d-flex align-items-center text-decoration-none mt-3">
                                <img src={call} alt="phone icon" className='icon' />
                                <p className="mb-0 mx-2 txt">+91 9820373390</p>
                            </a>
                            <h3 className='my-3' style={{ fontWeight: '700', color: '#ffc107' }}>
                                Social Media
                            </h3>
                            <a href="https://www.instagram.com/yasham_foundation/" target="_blank" className="mr-3 mx-2">
                                <img src={insta} alt="instagram icon" className="footer-icon" />
                            </a>
                            <a href="https://www.facebook.com/100069949045484/posts/104813755189149/" target="_blank" className="mr-3 mx-2">
                                <img src={fb} alt="facebook icon" className="footer-icon" />
                            </a>
                            <a href="https://www.linkedin.com/company/yasham-foundation/" target="_blank" className="mr-3 mx-3">
                                <img src={linkedin} alt="linkedin icon" className="footer-icon" />
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Form className="contact-form p-4" style={{ backgroundColor: '#f8f9fa' }} noValidate validated={validated} onSubmit={handleMailTo}>
                    <h1 className='mb-3' style={{ fontWeight: '700' }}>Feedback</h1>
                       
                        <Form.Group controlId="formSubject" className="mt-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a subject.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formMessage" className="mt-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a message.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="warning" className="text-white mt-4" style={{ fontWeight: 'bold' }} type="submit">
                            Send Mail
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
