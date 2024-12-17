import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const About = () => {
    const [aboutData, setAboutData] = useState({
        description1: '',
        description2: '',
        story: '',
        donate: {
            title: '',
            point1: '',
            point2: '',
            point3: ''
        },
        volunteer: {
            title: '',
            point1: '',
            point2: '',
            point3: ''
        }
    });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/about';
                const response = await axios.get(deployedUrl);
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data from deployed URL, trying local URL:', error);
                try {
                    const localUrl = 'http://localhost:5000/api/about';
                    const response = await axios.get(localUrl);
                    setAboutData(response.data);
                } catch (localError) {
                    console.error('Error fetching about data from local URL:', localError);
                }
            }
        };

        fetchAboutData();
    }, []);

    return (
        <Container className="my-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1 style={{ fontWeight: '700' }}>About Yasham</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={9}>
                    <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {aboutData.description1}
                            </Card.Text>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {aboutData.description2}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="text-center mb-4">
                <Col>
                    <h2 style={{ color: "#ffc107", fontWeight: '700' }}>Our Story</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="p-3" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {aboutData.story}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;