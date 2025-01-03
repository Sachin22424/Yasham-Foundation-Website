import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentMission.css'; // Reuse the same CSS as ContentMission
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

const ContentTeam = () => {
    const [teamData, setTeamData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        image: '',
        imageWidth: '',
        imageHeight: '',
        description: '',
        type: 'founder'
    });
    const [id, setId] = useState(''); // ID for updating
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Error state for validation
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const fetchTeamData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://yasham-foundation-website.onrender.com/api/team');
            setTeamData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching team data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, []);

    useEffect(() => {
        // Add the class to the body element
        document.body.classList.add('contentmission-background');

        // Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('contentmission-background');
        };
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!formData.name || !formData.position || !formData.image || !formData.imageWidth || !formData.imageHeight || !formData.description || !formData.type) {
            setError('All fields are required.');
            setShowModal(true); // Show the modal
            return;
        }

        try {
            setLoading(true);
            if (id) {
                // Update existing team member
                await axios.put(`https://yasham-foundation-website.onrender.com/api/team/${id}`, formData);
            } else {
                // Add new team member
                await axios.post('https://yasham-foundation-website.onrender.com/api/team', formData);
            }
            fetchTeamData();
            setFormData({ name: '', position: '', image: '', imageWidth: '', imageHeight: '', description: '', type: 'founder' });
            setId('');
            setLoading(false);
            setError(''); // Clear error message on successful submission
        } catch (error) {
            console.error('Error updating content:', error);
            setLoading(false);
        }
    };

    // Handle delete team member
    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`https://yasham-foundation-website.onrender.com/api/team/${id}`);
            fetchTeamData();
            setLoading(false);
        } catch (error) {
            console.error('Error deleting team member:', error);
            setLoading(false);
        }
    };

    // Handle edit team member
    const handleEdit = (member) => {
        setFormData(member);
        setId(member._id);
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Team Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h2>Team Member Details</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Position"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                </div>
            
                <div className="form-group">
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                </div>
                <div className="form-group">
                    <select
                        className="form-control"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="founder">Founder</option>
                        <option value="support">Support</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary btn-sm mb-5"
                    style={{
                        backgroundColor: '#662d91',
                        borderColor: '#662d91',
                        width: '15%',
                        padding: '10px',
                        fontSize: '16px'
                    }}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>

            <h2>Founders</h2>
            <div className="team-list">
                {teamData.filter(member => member.type === 'founder').map(member => (
                    <div key={member._id} className="team-member">
                        <h3>{member.name}</h3>
                        <p>{member.position}</p>
                        <img src={member.image} alt={member.name} style={{ width: member.imageWidth, height: member.imageHeight, display: 'block', margin: '0 auto' }} />
                        <p>{member.description}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleEdit(member)} className="btn btn-link"><FaEdit size={20} /></button>
                            <button onClick={() => handleDelete(member._id)} className="btn btn-link text-danger"><FaTrashAlt size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Supporting Members</h2>
            <div className="team-list">
                {teamData.filter(member => member.type === 'support').map(member => (
                    <div key={member._id} className="team-member">
                        <h3>{member.name}</h3>
                        <p>{member.position}</p>
                        <img src={member.image} alt={member.name} style={{ width: member.imageWidth, height: member.imageHeight, display: 'block', margin: '0 auto' }} />
                        <p>{member.description}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleEdit(member)} className="btn btn-link"><FaEdit size={20} /></button>
                            <button onClick={() => handleDelete(member._id)} className="btn btn-link text-danger"><FaTrashAlt size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Validation Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ContentTeam;