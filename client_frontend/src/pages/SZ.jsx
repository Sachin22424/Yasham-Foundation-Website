import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sliderImage1 from '../assets/SZ1.jpg';
import sliderImage2 from '../assets/SZ2.jpg';
import sliderImage3 from '../assets/SZ3.jpg';
import '../assets/YCM.css';
import { Card } from 'react-bootstrap';

const SZ = () => {
    return (
        <>
        <Col>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={sliderImage1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={sliderImage2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                   
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={sliderImage3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                       
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Col>
        <Container className="my-2">
            <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>

                <Card.Body>
                    <Card.Text className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                        <h1 style={{ fontWeight: '700', }}>Sunn Zara</h1>
                    </Card.Text>
                    <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                    Sunn Zara, is a mentoring initiative started by Yasham Foundation keeping in mind the hardships faced by the underprivileged section of our society during the pandemic. The mentorship program, inspired by Krishna Arjun Jodi, supports mentees in building socio-emotional relationships and improving conversational English skills. The latter always had a listening ear and a guiding heart through turbulent times, and this is exactly the mission of Sun Zara. The program gained global popularity, attracting mentors from diverse fields. Whilst providing the mentees with socio-emotional support our volunteers also give them lessons on conversational English skills. The program aims to reach out to the most vulnerable people, boost their self-confidence and empower them to be productive citizens.
                    </Card.Text>

                </Card.Body>
            </Card>
        </Container>
    </>
    );
};

export default SZ;