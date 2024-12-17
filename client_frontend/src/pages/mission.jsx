import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../assets/Mission.css';

const Mission = () => {
    const [missionData, setMissionData] = useState({
        missiondescription1: '',
        missiondescription2: '',
        missionurl: ''
    });

    useEffect(() => {
        const fetchMissionData = async () => {
            const localUrl = 'http://localhost:5000/api/about';
            const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/about';

            try {
                const response = await axios.get(deployedUrl);
                const { mission } = response.data;
                setMissionData(mission);
            } catch (error) {
                console.warn('Deployed URL failed, falling back to local URL.');
                try {
                    const response = await axios.get(localUrl);
                    const { mission } = response.data;
                    setMissionData(mission);
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
            <Row className="text-center mb-4">
                <Col>
                    <h1 style={{ fontWeight: '700' }}>Our Mission</h1>
                    <h4 className="mt-4">Our mission is to: Educate. <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Enlighten.</span> Empower.</h4>
                    <p className="lead mt-4">
                        {missionData.missiondescription1}
                    </p>
                    <p className="lead mt-4">
                        {missionData.missiondescription2}
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={7}>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={getEmbeddedUrl(missionData.missionurl)}
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