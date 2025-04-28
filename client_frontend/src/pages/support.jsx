import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory
import axios from 'axios';
import '../assets/Support.css'; // Ensure the path is correct
import volunteer from '../assets/volunteer.png';
import donate from '../assets/donate.png';

const Support = () => {
    const [donateData, setDonateData] = useState({
        title: '',
        point1: '',
        point2: '',
        point3: ''
    });
    const [volunteerData, setVolunteerData] = useState({
        title: '',
        point1: '',
        point2: '',
        point3: '',
        point4: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Updated from useHistory

    useEffect(() => {
        const fetchSupportData = async () => {
            try {
                const deployedUrl = 'https://yasham-foundation-website-production.up.railway.app/api/about';
                const localUrl = 'http://localhost:5000/api/about';
                let response;
                try {
                    response = await axios.get(deployedUrl);
                } catch (error) {
                    console.warn('Deployed URL failed, falling back to local URL.');
                    response = await axios.get(localUrl);
                }
                const data = response.data;
                setDonateData(data.donate);
                setVolunteerData(data.volunteer);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching support data:', error);
                setLoading(false);
            }
        };

        fetchSupportData();
    }, []);

    const handleContactUsClick = () => {
        navigate('/contact'); // Navigate to the contact page
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="support-page py-5">
            <h1 className="text-center mb-4" style={{ fontWeight: '700' }}>Support Us</h1>
            {/* <p className="text-center mb-5" style={{ fontSize: '1.4rem' }}>{volunteerData.point4}</p> */}
            <Row>
                <Col md={6}>
                    <Card className="support-card p-4" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                        <Card.Body>
                            <center>
                                <img className="mb-1" src={donate} alt="donate" style={{ width: '100px', height: '100px' }} />
                            </center>
                            <h2 style={{ fontWeight: '700', textAlign: 'center' }}>Donate</h2>
                           
                            <p className="mt-3">{donateData.title}</p>
                            <ul>
                                <li>
                                    <p>{donateData.point1}</p>
                                </li>
                                <li>
                                    <p>{donateData.point2}</p>
                                </li>
                                <li>
                                    <p>{donateData.point3}</p>
                                </li>
                            </ul>
                            <Button variant="warning" className="text-white mt-4" style={{ fontWeight: 'bold' }} onClick={handleContactUsClick}>
                                Contact Us
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="support-card p-4" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
                        <Card.Body>
                            <center>
                                <img className="mb-1" src={volunteer} alt="volunteer" style={{ width: '92px', height: '92px' }} />
                            </center>
                            <h2 style={{ fontWeight: '700', textAlign: 'center' }}>Volunteer</h2>
                
                            <p className="mt-3">{volunteerData.title}</p>
                            <ul>
                                <li>
                                    <p>{volunteerData.point1}</p>
                                </li>
                                <li>
                                    <p>{volunteerData.point2}</p>
                                </li>
                                <li>
                                    <p>{volunteerData.point3}</p>
                                </li>
                            </ul>
                            <Button variant="warning" className="text-white mt-4" style={{ fontWeight: 'bold' }} onClick={handleContactUsClick}>
                                Contact Us
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Support;