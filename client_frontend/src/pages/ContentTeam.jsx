import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentMission.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

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
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const apiBaseUrl = 'https://yasham-foundation-website-production.up.railway.app/api/team';

    const fetchTeamData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiBaseUrl);
            setTeamData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching team data:', error);
            setError('Failed to fetch team data.');
            setShowModal(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, []);

    useEffect(() => {
        document.body.classList.add('contentmission-background');
        return () => {
            document.body.classList.remove('contentmission-background');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.position || !formData.image || !formData.imageWidth || !formData.imageHeight || !formData.description || !formData.type) {
            setError('All fields are required.');
            setShowModal(true);
            return;
        }

        try {
            setLoading(true);
            if (id) {
                console.log('Updating team member:', { id, formData });
                await axios.put(`${apiBaseUrl}/${id}`, formData);
                alert('Team member updated successfully!');
            } else {
                console.log('Creating new team member:', formData);
                await axios.post(apiBaseUrl, formData);
                alert('Team member added successfully!');
            }
            await fetchTeamData();
            setFormData({ name: '', position: '', image: '', imageWidth: '', imageHeight: '', description: '', type: 'founder' });
            setId('');
            setShowEditModal(false);
            setLoading(false);
            setError('');
            window.location.reload();
        } catch (error) {
            console.error('Error saving team member:', error.response || error);
            setError(`Failed to save team member: ${error.response?.data?.message || error.message}`);
            setShowModal(true);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${apiBaseUrl}/${id}`);
            await fetchTeamData();
            alert('Team member deleted successfully!');
            setLoading(false);
        } catch (error) {
            console.error('Error deleting team member:', error.response || error);
            setError(`Failed to delete team member: ${error.response?.data?.message || error.message}`);
            setShowModal(true);
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        console.log('Editing team member:', member);
        setFormData({
            name: member.name || '',
            position: member.position || '',
            image: member.image || '',
            imageWidth: member.imageWidth || '',
            imageHeight: member.imageHeight || '',
            description: member.description || '',
            type: member.type || 'founder'
        });
        setId(member._id);
        setShowEditModal(true);
    };

    const handleAddNew = () => {
        setFormData({ name: '', position: '', image: '', imageWidth: '', imageHeight: '', description: '', type: 'founder' });
        setId('');
        setShowEditModal(true);
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Team Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" onClick={handleAddNew} className="mb-4">
                Add New Team Member
            </Button>

            <h2>Founders</h2>
            <div className="team-list">
                {teamData.filter(member => member.type === 'founder').map(member => (
                    <div
                        key={member._id}
                        className="team-member"
                        onDoubleClick={() => handleEdit(member)}
                        style={{ cursor: 'pointer' }}
                    >
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
                    <div
                        key={member._id}
                        className="team-member"
                        onDoubleClick={() => handleEdit(member)}
                        style={{ cursor: 'pointer' }}
                    >
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

            {/* Edit/Add Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{id ? 'Edit Team Member' : 'Add Team Member'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Form.Label>Name</Form.Label>
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
                            <Form.Label>Position</Form.Label>
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
                            <Form.Label>Image URL</Form.Label>
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
                            <Form.Label>Image Width (use %)</Form.Label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageWidth"
                                value={formData.imageWidth}
                                onChange={handleChange}
                                placeholder="Image Width"
                            />
                        </div>
                        <div className="form-group">
                            <Form.Label>Image Height (use %)</Form.Label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageHeight"
                                value={formData.imageHeight}
                                onChange={handleChange}
                                placeholder="Image Height"
                            />
                        </div>
                        <div className="form-group">
                            <Form.Label>Description</Form.Label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-group">
                            <Form.Label>Type</Form.Label>
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
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="mt-3"
                        >
                            {loading ? 'Saving...' : id ? 'Update' : 'Add'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Error Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
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