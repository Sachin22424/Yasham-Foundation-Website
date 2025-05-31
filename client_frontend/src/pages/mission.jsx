import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const Mission = () => {
    const [missionData, setMissionData] = useState({
        titlemission1: '',
        titlemission2: '',
        missiondescription1: '',
        missiondescription2: '',
        missionurl: '',
        width: '',
        height: ''
    });

    useEffect(() => {
        const fetchMissionData = async () => {
            const localUrl = 'http://localhost:5000/api/about';
            const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/about`;

            try {
                const response = await axios.get(deployedUrl);
                const { mission, titlemission1, titlemission2, image } = response.data;
                setMissionData({
                    titlemission1,
                    titlemission2,
                    missiondescription1: mission.missiondescription1,
                    missiondescription2: mission.missiondescription2,
                    missionurl: mission.missionurl,
                    width: image.width,
                    height: image.height
                });
            } catch (error) {
                console.warn('Deployed URL failed, falling back to local URL.');
                try {
                    const response = await axios.get(localUrl);
                    const { mission, titlemission1, titlemission2, image } = response.data;
                    setMissionData({
                        titlemission1,
                        titlemission2,
                        missiondescription1: mission.missiondescription1,
                        missiondescription2: mission.missiondescription2,
                        missionurl: mission.missionurl,
                        width: image.width,
                        height: image.height
                    });
                } catch (localError) {
                    console.error('Error fetching mission data from local URL:', localError);
                }
            }
        };

        fetchMissionData();
    }, []);

    // Convert the YouTube URL to an embedded URL
    const getEmbeddedUrl = (url) => {
        const videoId = url.split('v=')[1];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <Container className="my-5">
            <Row>
            <Col md={6}>
                    <div className="ratio ratio-16x9" style={{marginTop: '50px' }}>
                        <iframe
                            src={getEmbeddedUrl(missionData.missionurl)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Yasham Foundation Mission Video"
                        ></iframe>
                    </div>
                </Col>
                <Col md={6}>
                    <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                        <Card.Body>
                            <Card.Text className="text-center" style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                <h1 style={{ fontWeight: '700' }}>{missionData.titlemission1}</h1>
                                <h4 className="mt-4">{missionData.titlemission2}</h4>
                            </Card.Text>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {missionData.missiondescription1}
                            </Card.Text>
                            <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                                {missionData.missiondescription2}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Mission;