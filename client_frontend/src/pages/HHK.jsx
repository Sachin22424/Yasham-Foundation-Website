import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sliderImage1 from '../assets/HHK2.jpg';
import sliderImage2 from '../assets/HHK3.jpg';
import sliderImage3 from '../assets/HHK1.jpg';
import '../assets/YCM.css';
import { Card } from 'react-bootstrap';

const HHK = () => {
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
                        <h1 style={{ fontWeight: '700', }}>Hum Honge Kamyab</h1>
                    </Card.Text>
                    <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                    Offering support to students appearing in competitive exams, and providing Vocational, Skill, Semi-skill courses at subsidized rates. In this initiative, we provide underprivileged students with the coaching of competitive exams and other courses at free, subsidized, or nominal rates. Yasham has partnered with educational institutions that facilitate this training. Due to the rising population of the youth, India has become very competitive in terms of receiving a quality education. All the entrance examinations require a long and rigorous training for succeeding in them. The students who cannot afford coaching at premium institutes have to suppress their potential and settle for institutes with lower rankings. It is critical that talent doesn’t get lost due to a lack of secondary factors like money or social standing. Keeping that in mind, Yasham has started this initiative. Hum Honge Kamyab works to provide skill development, career placements, and mentoring or counseling sessions apart from the coaching classes we provide. Our partners have facilitated support for competitive exams like JEE, NEET, LAW, CA, UPSC, GATE, etc. Furthermore, vocational courses and other skill-development courses are also made available at subsidized rates. These programs provide training and also focus on the development, counseling, and career guidance of our students.
                    </Card.Text>

                </Card.Body>
            </Card>
        </Container>
    </>
    );
};

export default HHK;