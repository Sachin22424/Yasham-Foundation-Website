import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../assets/Support.css'; // Custom styling for Support component
import volunteer from '../assets/volunteer.png';
import donate from '../assets/donate.png';

const Support = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [validated, setValidated] = useState(false);

    const handleMailTo = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const mailtoLink = `mailto:yashamfoundation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0APhone: ${encodeURIComponent(phone)}`;
            window.location.href = mailtoLink;
        }
        setValidated(true);
    };

    return (
        <Container className="support-page py-5">
            <h1 className="text-center mb-4" style={{ fontWeight: '700' }}>Support Us</h1>
            <p className="text-center mb-5" style={{ fontSize: '1.4rem' }}>You can support our work through donations or by volunteering or mentoring with us.</p>
            <Row>
                <Col md={6}>
                    <Card className="support-card p-4" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                        <Card.Body>
                            <center><img className='mb-1' src={donate} alt="donate" style={{ width: '100px', height: '100px' }} /></center>
                            <h2 style={{ fontWeight: '700', textAlign: 'center' }}>Donate</h2>
                            <p className='mt-3'>Help us, help those in need!</p>
                            <ul>
                                <li>
                                    <p>Yasham Foundation is a Public Charitable Trust registered under the Bombay Public Trust Act, 1950.</p>
                                </li>
                                <li>
                                    <p>All donations are eligible for a 50% tax exemption under section 80G of the Income Tax Act.</p>
                                </li>
                                <li>
                                    <p>We also accept donations in cash or kind. Contact Us!</p>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="support-card p-4" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                        <Card.Body>
                            <center><img className='mb-1' src={volunteer} alt="donate" style={{ width: '92px', height: '92px' }} /></center>
                            <h2 style={{ fontWeight: '700', textAlign: 'center' }}>Volunteer</h2>
                            <p className='mt-3'>We are always in need of enthusiastic volunteers.</p>
                            <ul>
                                <li>
                                    <p>For opportunities in Teaching, Content Curation, Design, Filmmaking, Photography, Editing.</p>
                                </li>
                                <li>
                                    <p>Certifications and recommendation letters will be provided as needed for student volunteers.</p>
                                </li>
                                <li>
                                    <p>If interested in either volunteering or mentoring, contact us!</p>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col md={12}>
                    <Card className="support-card p-4" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                        <Card.Body>
                            <h2 style={{ fontWeight: '700', textAlign: 'center' }}>Contact Us</h2>
                            <Form noValidate validated={validated} onSubmit={handleMailTo}>
                                <Form.Group controlId="formName">
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
                                        pattern="\d{10}" // Regex pattern for exactly 10 digits
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid 10-digit phone number.
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
                                <Button variant="warning" className="text-white mt-4" style={{ fontWeight: 'bold' }} type="submit">
                                    Send Mail
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Support;
