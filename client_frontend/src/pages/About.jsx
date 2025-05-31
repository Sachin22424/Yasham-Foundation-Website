import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const About = () => {
    const [aboutData, setAboutData] = useState({
        title1: '',
        title2: '',
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
        },
        image: {
            url: '',
            width: '',
            height: ''
        }
    });

    useEffect(() => {
        const fetchAboutData = async () => {
            const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/about`;
            // const localUrl = 'http://localhost:5000/api/about';
            try {
                const response = await axios.get(deployedUrl);
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data from deployed URL, trying local URL:', error);
                try {
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
            <Row>
                <Col md={4}>
                    <img src={aboutData.image.url} alt="About Yasham" style={{ width: aboutData.image.width, height: aboutData.image.height, borderRadius: '10px' }} />
                </Col>
                <Col md={8}>
                    <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <div className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                <h1 style={{ fontWeight: '700' }}>{aboutData.title1}</h1>
                            </div>
                            <div style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {aboutData.description1}
                            </div>
                            <div className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                <h2 style={{ color: "#ffc107", fontWeight: '700', marginBottom: '10px', marginTop:'15px' }}>{aboutData.title2}</h2>
                            </div>
                            <div style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {aboutData.story}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;