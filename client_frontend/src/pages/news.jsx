import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../assets/News.css'; // Custom styling for News component

const News = () => {
    return (
        <Container className="news-page py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="news-card">
                    <Card.Img 
    variant="top" 
    src="https://static.toiimg.com/thumb/msid-78962390,width-400,height-300,quality-80,overlay-toiimgls/photo.jpg" 
    alt="News Image" 
    className="news-image"
    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
/>

                        <Card.Body>
                            <Card.Title className="news-title">Keeping their JEE, NEET dreams alive</Card.Title>
                            <Card.Text className="news-content">
                                <p>
                                    The pandemic has made it hard for many students to continue their education, especially those preparing for JEE and NEET exams.
                                    However, numerous NGOs and initiatives have risen to help these students by providing them with study materials, mentorship, and financial support to keep their dreams alive. This article discusses the efforts of these organizations to support students in need, especially those from underprivileged backgrounds.
                                </p>
                                <p>
                                    The drive to ensure that students can continue their education without facing a financial burden has helped thousands of students.
                                    Various NGOs are actively engaging with government and private sectors to provide resources, including free coaching classes, online study materials, and even helping with exam fees. 
                                </p>
                            </Card.Text>
                            <Button className='btn btn-warning text-white'
                                href="https://mumbaimirror.indiatimes.com/mumbai/other/keeping-their-jee-neet-dreams-alive/articleshow/78962390.cms" 
                                target="_blank" 
                                variant="warning"
                                style={{ fontWeight: 'bold' }}>
                                Read Full Article
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default News;
