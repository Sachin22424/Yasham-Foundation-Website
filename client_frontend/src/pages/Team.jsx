import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';
import '../assets/Team.css';  // Ensure you create and include your custom CSS

const Team = () => {
    const [show, setShow] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [founderMembers, setFounderMembers] = useState([]);
    const [supportMembers, setSupportMembers] = useState([]);
    const [supportIntlMembers, setSupportIntlMembers] = useState([]);
    const [socialMembers, setSocialMembers] = useState([]); // New social media team

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/team`);
                const data = response.data;
                setFounderMembers(data.filter(member => member.type === 'founder'));
                setSupportMembers(data.filter(member => member.type === 'support'));
                setSupportIntlMembers(data.filter(member => member.type === 'internatial'));
                setSocialMembers(data.filter(member => member.type === 'social')); // New team filter
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

    const renderTeamSection = (title, members, id = null) => (
        <Card className="p-3 team-card mt-4" id={id}>
            <Card.Body>
                {/* ✅ Use div instead of Card.Text for headings */}
                <div>
                    <h2 className="section-title">{title}</h2>
                </div>

                {/* ✅ Use div instead of Card.Text for grid */}
                <div className="team-grid mt-4">
                    {members.map((member, index) => (
                        <div key={index} className="team-member" onClick={() => handleShow(member)}>
                            <img src={member.image} alt={member.name} className="member-image" />
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p>{member.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );

    return (
        <div className="team-section">
            <div className="team-header">
                <h1>Our Team</h1>
            </div>

            {renderTeamSection('Founding Team', founderMembers)}
            {renderTeamSection('Supporting Team', supportMembers)}
            {renderTeamSection('Supporting International Team', supportIntlMembers)}
            {renderTeamSection('Social Media Team', socialMembers, 'social')} {/* New Section with id */}

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
