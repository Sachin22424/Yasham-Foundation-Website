import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/Mission.css';

const Mission = () => {
    return (
        <Container className="my-5">
            <Row className="text-center mb-4">
                <Col>
                    <h1 style={{ fontWeight: '700' }}>Our Mission</h1>
                    <h4 className="mt-4">Our mission is to: Educate. <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Enlighten.</span>  Empower.</h4>
                    <p className="lead mt-4">
                        We aim to educate, enlighten, and empower society. Our mission is to reach young minds, sharpen their skills, and uplift the community through education and support, so they can thrive and inspire future generations.
                    </p>
                    <p className="lead mt-4">
                        Yasham Foundation works tirelessly every day to foster growth, compassion, and resilience. Our goal is to support children from all walks of life, nurturing them to become the best version of themselves, and empowering families across the country to achieve a better tomorrow.
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={7}>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src="https://www.youtube.com/embed/Xnr5AVAnAw0" // replace 'your_video_id' with actual video ID
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Yasham Foundation Mission Video"
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Mission;
