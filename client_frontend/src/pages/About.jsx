import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="my-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1 style={{  fontWeight: '700' }}>About Yasham</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={9}>
                    <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                Yasham works every single day to empower society holistically, through changes big or small. 
                                We work predominantly in the field of education to sharpen young minds and make them a better version of themselves, irrespective of where they come from.
                            </Card.Text>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                Our mission is to: <strong>Educate. Enlighten. Empower.</strong> A mind that challenges itself is a mind that shines through tough circumstances.
                                We serve to educate these minds today, so they may be empowered to do the same for the generations to come.
                                By doing so, we are reminding everyone of their humanity, to be better and do better every single day.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="text-center mb-4">
                <Col>
                    <h2 style={{ color: "#ffc107" , fontWeight: '700' }}>Our Story</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="p-3" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                Yasham was born out of a casual encounter with a Municipal School student Samir, whom Mrs. Mandelia was tutoring 
                                when she realized there was so much more she could do to uplift the educational standards for children from impoverished families. 
                                This is how our first centre started in August, 2014. She then went on to register Yasham Foundation in June, 2015. 
                                Since then, Yasham has educated over 750 students, alleviated 500 families, and assisted around 600 women from all across the country.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default About;
