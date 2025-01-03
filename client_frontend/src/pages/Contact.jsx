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
        feedbackmessage: '',
        getInTouchHeading: '',
        followUsHeading: ''
    });
    const [name, setName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/contact';
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

    const validateEmailOrPhone = (input) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;
        return emailPattern.test(input) || phonePattern.test(input);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Validate email or phone
        if (!validateEmailOrPhone(emailOrPhone)) {
            setError('Please enter a valid email address or a 10-digit phone number.');
            return;
        }

        try {
            const deployedFeedbackUrl = 'https://yasham-foundation-website.onrender.com/api/feedback';
            const response = await axios.post(deployedFeedbackUrl, {
                name,
                emailOrPhone,
                subject,
                message
            });
            if (response.status === 201) {
                setShowThankYou(true);
                setName('');
                setEmailOrPhone('');
                setSubject('');
                setMessage('');
                setError(''); // Clear any previous error
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
                                {contactInfo.getInTouchHeading}
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
                                {contactInfo.followUsHeading}
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
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmailOrPhone" className="mt-3">
                            <Form.Label>Email or Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email or phone number"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubject" className="mt-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
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