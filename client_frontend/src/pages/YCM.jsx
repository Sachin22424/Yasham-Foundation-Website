import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sliderImage1 from '../assets/YCM1.jpg';
import sliderImage2 from '../assets/YCM2.jpg';
import sliderImage3 from '../assets/YCM3.jpg';
import '../assets/YCM.css';
import { Card } from 'react-bootstrap';

const YCM = () => {
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
                            <h1 style={{ fontWeight: '700', }}>Centre Model - Cuffe Parade</h1>
                        </Card.Text>
                        <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                            The centre model is an after-school program which supports the underprivileged children of the nearby communities.
                            Trained teachers, adult volunteers, and students from privileged schools conduct English, Mathematics and Science classes.
                            Value systems, Character formation, Personality development, and the importance of hygiene and cleanliness are also taught to them.
                            The final goal is to create a strong foundation so that every child is groomed holistically to channel into the mainstream.
                            Our main centre is at G.D Somani (IGSC) and B D Somani(I. B) Colaba, Mumbai.
                            Other centres in Worli, Tardeo, Grant Road, Marine Lines, Forgetee Street, and Sion areas of Mumbai.
                        </Card.Text>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default YCM;
