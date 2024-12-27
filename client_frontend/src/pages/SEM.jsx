import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sliderImage1 from '../assets/SEM1.jpg';
import sliderImage2 from '../assets/SEM2.jpg';
import '../assets/YCM.css';
import { Card } from 'react-bootstrap';

const SEM = () => {
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
                        </Carousel>
                    </Col>
                    <Container className="my-2">
                        <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
        
                            <Card.Body>
                                <Card.Text className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                    <h1 style={{ fontWeight: '700', }}>Swachh English Mission</h1>
                                </Card.Text>
                                <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                Yasham addresses limited speaking and writing skills by providing coaching through trained volunteers. This initiative benefits students in preparing for the highly competitive professional world, whether in mainstream high-profile professions or blue-collar jobs, which are the backbone of any country.
                                </Card.Text>
        
                            </Card.Body>
                        </Card>
                    </Container>
                </>

    );
};

export default SEM;