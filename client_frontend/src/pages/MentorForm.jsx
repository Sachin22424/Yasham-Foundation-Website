import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../assets/Contact.css'; // Custom styling for Contact component

const MentorForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        age: '',
        location: '',
        occupation: '',
        organization: '',
        education: '',
        experience: '',
        subjects: '',
        ageGroup: '',
        certifications: '',
        daysAvailable: [],
        timeSlots: '',
        hoursPerWeek: '',
        motivation: '',
        impact: '',
        otherNGOs: '',
        laptopAccess: '',
        preferences: '',
        backgroundCheck: '',
        acknowledgment: false
    });
    const [showThankYou, setShowThankYou] = useState(false);
    const [error, setError] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/contact`);
                const contactInfo = response.data;
                setModalTitle(contactInfo.mentorFormModalTitle);
                setModalBody(contactInfo.mentorFormModalBody);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                [name]: [...formData[name], value]
            });
        } else {
            setFormData({
                ...formData,
                [name]: formData[name].filter((item) => item !== value)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.phone || !formData.location || !formData.occupation || !formData.education || !formData.subjects || !formData.ageGroup || !formData.daysAvailable.length || !formData.hoursPerWeek || !formData.laptopAccess || !formData.backgroundCheck || !formData.acknowledgment) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/mentors`, formData);
            if (response.status === 201) {
                setShowThankYou(true);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    age: '',
                    location: '',
                    occupation: '',
                    organization: '',
                    education: '',
                    experience: '',
                    subjects: '',
                    ageGroup: '',
                    certifications: '',
                    daysAvailable: [],
                    timeSlots: '',
                    hoursPerWeek: '',
                    motivation: '',
                    impact: '',
                    otherNGOs: '',
                    laptopAccess: '',
                    preferences: '',
                    backgroundCheck: '',
                    acknowledgment: false
                });
                setError('');
            }
        } catch (error) {
            setError('Failed to submit the form. Please try again later.');
        }
    };

    const handleClose = () => setShowThankYou(false);

    return (
        <Container className="contact-page py-5">
            <Row>
                <Col md={12}>
                    <Form className="contact-form p-4" style={{ backgroundColor: '#f8f9fa' }} noValidate onSubmit={handleSubmit}>
                        <h1 className='mb-3' style={{ fontWeight: '700' }}>Mentor Application Form</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group controlId="formFullName" className="mt-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mt-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAge" className="mt-3">
                            <Form.Label>Age (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation" className="mt-3">
                            <Form.Label>Location/City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formOccupation" className="mt-3">
                            <Form.Label>Occupation/Profession</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formOrganization" className="mt-3">
                            <Form.Label>Organization/Institution (if applicable) (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your organization"
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEducation" className="mt-3">
                            <Form.Label>Educational Qualifications</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your educational qualifications"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formExperience" className="mt-3">
                            <Form.Label>Teaching or Mentoring Experience (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Describe your experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubjects" className="mt-3">
                            <Form.Label>Subjects or Skills You Can Teach</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subjects or skills"
                                name="subjects"
                                value={formData.subjects}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formAgeGroup" className="mt-3">
                            <Form.Label>Preferred Age Group to Mentor</Form.Label>
                            <Form.Control
                                as="select"
                                name="ageGroup"
                                value={formData.ageGroup}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select age group</option>
                                <option value="Children">Children</option>
                                <option value="Teenagers">Teenagers</option>
                                <option value="Young Adults">Young Adults</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCertifications" className="mt-3">
                            <Form.Label>Certifications or Achievements (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter certifications or achievements"
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDaysAvailable" className="mt-3">
                            <Form.Label>Days Available for Mentoring</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="Weekdays"
                                    type="checkbox"
                                    name="daysAvailable"
                                    value="Weekdays"
                                    checked={formData.daysAvailable.includes('Weekdays')}
                                    onChange={handleCheckboxChange}
                                />
                                <Form.Check
                                    inline
                                    label="Weekends"
                                    type="checkbox"
                                    name="daysAvailable"
                                    value="Weekends"
                                    checked={formData.daysAvailable.includes('Weekends')}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formTimeSlots" className="mt-3">
                            <Form.Label>Preferred Time Slots (Optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter preferred time slots"
                                name="timeSlots"
                                value={formData.timeSlots}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHoursPerWeek" className="mt-3">
                            <Form.Label>Hours Per Week</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter hours per week"
                                name="hoursPerWeek"
                                value={formData.hoursPerWeek}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMotivation" className="mt-3">
                            <Form.Label>Motivation (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Why do you want to mentor or teach with us?"
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImpact" className="mt-3">
                            <Form.Label>Impact (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="What impact do you hope to make as a mentor/teacher?"
                                name="impact"
                                value={formData.impact}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOtherNGOs" className="mt-3">
                            <Form.Label>Other NGOs or Voluntary Work (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Have you been involved with any other NGOs or voluntary work?"
                                name="otherNGOs"
                                value={formData.otherNGOs}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLaptopAccess" className="mt-3">
                            <Form.Label>Laptop and Internet Access</Form.Label>
                            <Form.Control
                                as="select"
                                name="laptopAccess"
                                value={formData.laptopAccess}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPreferences" className="mt-3">
                            <Form.Label>Preferences or Special Requirements (Optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter any preferences or special requirements"
                                name="preferences"
                                value={formData.preferences}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBackgroundCheck" className="mt-3">
                            <Form.Label>Background Check</Form.Label>
                            <Form.Control
                                as="select"
                                name="backgroundCheck"
                                value={formData.backgroundCheck}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formAcknowledgment" className="mt-3">
                            <Form.Check
                                type="checkbox"
                                label="I acknowledge and agree to the NGO's policies"
                                name="acknowledgment"
                                checked={formData.acknowledgment}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="warning"
                            className="text-white mt-4"
                            style={{ fontWeight: 'bold' }}
                            type="submit"
                            title="Submit your application"
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={showThankYou} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MentorForm;