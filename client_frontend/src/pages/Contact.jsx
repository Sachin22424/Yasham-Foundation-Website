import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../assets/Contact.css'; // Custom styling for Contact component
import mail from '../assets/email_b.png';
import call from '../assets/phone_b.png';
import insta from '../assets/insta_b.png';
import fb from '../assets/fb_b.png';
import linkedin from '../assets/ld_b.png';

const Contact = () => {
    const [contactInfo, setContactInfo] = useState({
        mail: '',
        number: '',
        linkedin: '',
        facebook: '',
        instagram: '',
        feedbacktitle: '',
        feedbackmessage: ''
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/contact';
                const localUrl = 'http://localhost:5000/api/contact';
                const response = await axios.get(deployedUrl);
                setContactInfo(response.data);
            } catch (error) {
                console.error('Error fetching contact info from deployed URL, trying local URL:', error);
                try {
                    const response = await axios.get(localUrl);
                    setContactInfo(response.data);
                } catch (localError) {
                    console.error('Error fetching contact info from local URL:', localError);
                }
            }
        };

        fetchContactInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
    
        if (!name || !email || !subject || !message) {
            setError('All fields are required.');
            return;
        }
    
        try {
            const deployedFeedbackUrl = 'https://yasham-foundation-website.onrender.com/api/feedback';
            const response = await axios.post(deployedFeedbackUrl, {
                name,
                email,
                subject,
                message
            });
            if (response.status === 201) {
                setShowThankYou(true);
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setError(''); // Clear any existing errors
            }
        } catch (error) {
            setError('Failed to submit feedback. Please try again later.');
        }
    };
    

    const handleClose = () => setShowThankYou(false);

    return (
        <Container className="contact-page py-5">
            <Row>
                <Col md={6}>
                    <Card className="contact-info-card p-4" style={{ backgroundColor: '#fafafa', border: 'none' }}>
                        <Card.Body>
                            <h1 style={{ fontWeight: '700' }}>
                                Contact Information
                            </h1>
                            <a href={`mailto:${contactInfo.mail}`} className="d-flex align-items-center text-decoration-none mt-4">
                                <img src={mail} alt="email icon" className='icon' />
                                <p className="mb-0 mx-2 txt">{contactInfo.mail}</p>
                            </a>
                            <a href={`tel:${contactInfo.number}`} className="d-flex align-items-center text-decoration-none mt-3">
                                <img src={call} alt="phone icon" className='icon' />
                                <p className="mb-0 mx-2 txt">{contactInfo.number}</p>
                            </a>
                            <h3 className='my-3' style={{ fontWeight: '700', color: '#ffc107' }}>
                                Social Media
                            </h3>
                            <a href={contactInfo.instagram} target="_blank" className="mr-3 mx-2">
                                <img src={insta} alt="instagram icon" className="footer-icon" />
                            </a>
                            <a href={contactInfo.facebook} target="_blank" className="mr-3 mx-2">
                                <img src={fb} alt="facebook icon" className="footer-icon" />
                            </a>
                            <a href={contactInfo.linkedin} target="_blank" className="mr-3 mx-3">
                                <img src={linkedin} alt="linkedin icon" className="footer-icon" />
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Form className="contact-form p-4" style={{ backgroundColor: '#f8f9fa' }} noValidate onSubmit={handleSubmit}>
                        <h1 className='mb-3' style={{ fontWeight: '700' }}>Feedback</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group controlId="formName" className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email/Phone No.</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email/phone no."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubject" className="mt-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
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
                        </Form.Group>
                        <Button
                            variant="warning"
                            className="text-white mt-4"
                            style={{ fontWeight: 'bold' }}
                            type="submit"
                            title="Send your feedback"
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={showThankYou} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{contactInfo.feedbacktitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{contactInfo.feedbackmessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Contact;