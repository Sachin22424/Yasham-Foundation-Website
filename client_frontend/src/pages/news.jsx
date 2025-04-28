import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../assets/YCM.css';

const News = () => {
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website-production.up.railway.app/api/news');
                setNewsData(response.data[0]); // Assuming the API returns an array and we need the first item
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNewsData();
    }, []);

    if (!newsData) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="my-5">
            <Row>
                {/* Image Section */}
                <Col md={4}>
                    <img
                        src={newsData.image.url}
                        alt="Latest News"
                        style={{ width: '100%', borderRadius: '10px' }}
                    />
                </Col>
                
                {/* Content Section */}
                <Col md={8}>
                    <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            {/* Title Section */}
                            <Card.Text className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                <h1 style={{ fontWeight: '700' }}>{newsData.heading}</h1>
                            </Card.Text>
                            
                            {/* News Content */}
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {newsData.description}
                            </Card.Text>
                            
                            {/* Button Section */}
                            <div className="text-center">
                                <Button
                                    href={newsData.articleUrl}
                                    target="_blank"
                                    variant="warning"
                                    style={{ fontWeight: 'bold', color: 'white' }}
                                >
                                    {newsData.buttonText}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default News;