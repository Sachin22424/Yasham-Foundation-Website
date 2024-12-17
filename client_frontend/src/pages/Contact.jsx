import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
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
        instagram: ''
    });
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);

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
                    const response = await axios.get('http://localhost:5000/api/contact');
                    setContactInfo(response.data);
                } catch (localError) {
                    console.error('Error fetching contact info from local URL:', localError);
                }
            }
        };

        fetchContactInfo();
    }, []);

    const handleMailTo = (e) => {
        const form = e.currentTarget;
        e.preventDefault(); // Prevent form submission
        if (form.checkValidity() === false) {
            setValidated(true); // Set validated to true so feedback messages appear
            return;
        }

        // If validation is successful, prepare mailto link
        const mailtoLink = `mailto:${contactInfo.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0APhone: ${encodeURIComponent(phone)}`;
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
                    <Form className="contact-form p-4" style={{ backgroundColor: '#f8f9fa' }} noValidate validated={validated} onSubmit={handleMailTo}>
                        <h1 className='mb-3' style={{ fontWeight: '700' }}>Contact Us</h1>
                        <Form.Group controlId="formName" className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mt-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your phone number.
                            </Form.Control.Feedback>
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
                        <Button
                            variant="warning"
                            className="text-white mt-4"
                            style={{ fontWeight: 'bold' }}
                            type="submit"
                            disabled={!contactInfo.mail} // Disable if no email is fetched
                            title={!contactInfo.mail ? 'Email address is not available' : 'Send your feedback'}
                        >
                            Send Mail
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;