import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import newsImage from '../assets/news.png'; // Replace with the appropriate path to your news image

const News = () => {
    return (
        <Container className="my-5">
            <Row>
                {/* Image Section */}
                <Col md={4}>
                    <img
                        src={newsImage}
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
                                <h1 style={{ fontWeight: '700' }}>Latest News</h1>
                            </Card.Text>
                            
                            {/* News Content */}
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                The pandemic has made it hard for many students to continue their education, especially those preparing for JEE and NEET exams. However, numerous NGOs and initiatives have risen to help these students by providing them with study materials, mentorship, and financial support to keep their dreams alive.
                                <br /><br />
                                The drive to ensure that students can continue their education without facing a financial burden has helped thousands of students. Various NGOs are actively engaging with government and private sectors to provide resources, including free coaching classes, online study materials, and even helping with exam fees.
                            </Card.Text>
                            
                            {/* Button Section */}
                            <div className="text-center">
                            <Button
    href="https://mumbaimirror.indiatimes.com/mumbai/other/keeping-their-jee-neet-dreams-alive/articleshow/78962390.cms"
    target="_blank"
    variant="warning"
    style={{ fontWeight: 'bold', color: 'white' }}
>
    Read Full Article
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
