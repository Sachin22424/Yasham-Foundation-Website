import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/YCM.css';

const HHK = () => {
    const [hhkData, setHhkData] = useState(null);

    useEffect(() => {
        const fetchHhkData = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website.onrender.com/api/hhk');
                setHhkData(response.data[0]); // Assuming the API returns an array and we need the first item
            } catch (error) {
                console.error('Error fetching HHK data:', error);
            }
        };

        fetchHhkData();
    }, []);

    if (!hhkData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Col>
                <Carousel>
                    {hhkData.images.map((image, index) => (
                        <Carousel.Item key={index} interval={3000}>
                            <img
                                className="d-block w-100 carousel-img"
                                src={image.url}
                                alt={`Slide ${index + 1}`}
                            />
                            <Carousel.Caption>
                                <h3>{image.caption}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
            <Container className="my-2">
                <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                    <Card.Body>
                        <Card.Text className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                            <h1 style={{ fontWeight: '700', }}>{hhkData.title}</h1>
                        </Card.Text>
                        <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                            {hhkData.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default HHK;