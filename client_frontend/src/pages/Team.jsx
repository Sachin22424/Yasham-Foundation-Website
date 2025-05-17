import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';
import '../assets/Team.css';  // Ensure you create and include your custom CSS

const Team = () => {
    const [show, setShow] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [founderMembers, setFounderMembers] = useState([]);
    const [supportMembers, setSupportMembers] = useState([]);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website-production.up.railway.app/api/team');
                const data = response.data;
                setFounderMembers(data.filter(member => member.type === 'founder'));
                setSupportMembers(data.filter(member => member.type === 'support'));
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeamData();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = (member) => {
        setSelectedMember(member);
        setShow(true);
    };

    return (
        <div className="team-section">
            <div className="team-header">
                <h1>Our Team</h1>
            </div>

            <Card className="p-3 team-card">
                <Card.Body>
                    <Card.Text>
                        <h2 className="section-title">Founding Team</h2>
                    </Card.Text>
                    <Card.Text>
                        <div className="team-grid mt-4">
                            {founderMembers.map((member, index) => (
                                <div key={index} className="team-member" onClick={() => handleShow(member)}>
                                    <img src={member.image} alt={member.name} className="member-image" />
                                    <div className="member-info">
                                        <h3>{member.name}</h3>
                                        <p>{member.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="team-header"></div>

            <Card className="p-3 team-card">
                <Card.Body>
                    <Card.Text>
                        <h2 className="section-title">Supporting Team</h2>
                    </Card.Text>
                    <Card.Text>
                        <div className="team-grid mt-4">
                            {supportMembers.map((member, index) => (
                                <div key={index} className="team-member" onClick={() => handleShow(member)}>
                                    <img src={member.image} alt={member.name} className="member-image" />
                                    <div className="member-info">
                                        <h3>{member.name}</h3>
                                        <p>{member.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMember?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedMember?.image} alt={selectedMember?.name} className="modal-image" />
                    <p>{selectedMember?.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Team;