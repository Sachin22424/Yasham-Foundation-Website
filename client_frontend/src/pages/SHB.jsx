import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sliderImage1 from '../assets/SHB1.jpg';
import sliderImage2 from '../assets/SHB2.jpg';
import sliderImage3 from '../assets/SHB3.jpg';
import '../assets/YCM.css';
import { Card } from 'react-bootstrap';

const SHB = () => {
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
                            <h1 style={{ fontWeight: '700', }}>Saathi Haath Badhana</h1>
                        </Card.Text>
                        <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                        We establish community facilities offering tailoring, beautician courses, crochet, and classes for making cloth and paper bags. The aim is to empower women to become financially independent, boosting self-esteem and confidence. Children that see their mothers being independent and willing to learn are likely to be motivated to do better and perform well in their respective fields as well.
                        </Card.Text>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default SHB;