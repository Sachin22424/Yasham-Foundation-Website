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
                const response = await axios.get('https://yasham-foundation-website.onrender.com/api/team');
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
            <div className="team-section" style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: '700' }}>Our Team</h1>
            </div>

            <Card className="p-3" style={{ border: 'none', backgroundColor: '#ffffff' }}>
                <Card.Body >
                    <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                        <h2 style={{ fontWeight: '700', marginLeft: '10px', color: '#ffc107' }}>Founding Team</h2>
                    </Card.Text>
                    
                    <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                        <div className="team-grid mt-4" style={{ textAlign: 'center' }}>
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

            <div className="team-section" style={{ textAlign: 'center' }}></div>

            <Card className="p-3" style={{ border: 'none', backgroundColor: '#ffffff' }}>
                <Card.Body>
                    <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                        <h2 style={{ fontWeight: '700', marginLeft: '10px', color: '#ffc107' }}>Supporting Team</h2>
                    </Card.Text>
                    <Card.Text style={{ color: "#333333", fontSize: "1.2em", lineHeight: "1.6" }}>
                        <div className="team-grid mt-4" style={{ textAlign: 'center' }}>
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

            <Modal show={show} onHide={handleClose}>
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