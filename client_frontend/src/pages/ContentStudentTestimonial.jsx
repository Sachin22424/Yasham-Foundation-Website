import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ContentStudentTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        image: '',
        feedback: ''
    });
    const [editId, setEditId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const apiBaseUrl = 'https://yasham-foundation-website-production.up.railway.app/api/student-testimonials';

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiBaseUrl);
            setTestimonials(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setError('Failed to fetch testimonials.');
            setShowModal(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    useEffect(() => {
        document.body.classList.add('contenthome-background');
        return () => {
            document.body.classList.remove('contenthome-background');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.position || !formData.image || !formData.feedback) {
            setError('All fields are required.');
            setShowModal(true);
            return;
        }

        try {
            setLoading(true);
            if (editId) {
                console.log('Updating testimonial:', { id: editId, formData });
                await axios.put(`${apiBaseUrl}/${editId}`, formData);
                alert('Testimonial updated successfully!');
            } else {
                console.log('Creating new testimonial:', formData);
                await axios.post(apiBaseUrl, formData);
                alert('Testimonial added successfully!');
            }
            await fetchTestimonials();
            setFormData({ name: '', position: '', image: '', feedback: '' });
            setEditId('');
            setShowEditModal(false);
            setLoading(false);
            setError('');
            window.location.reload(); // Refresh page as requested
        } catch (error) {
            console.error('Error saving testimonial:', error.response || error);
            setError(`Failed to save testimonial: ${error.response?.data?.message || error.message}`);
            setShowModal(true);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${apiBaseUrl}/${id}`);
            await fetchTestimonials();
            alert('Testimonial deleted successfully!');
            setLoading(false);
        } catch (error) {
            console.error('Error deleting testimonial:', error.response || error);
            setError(`Failed to delete testimonial: ${error.response?.data?.message || error.message}`);
            setShowModal(true);
            setLoading(false);
        }
    };

    const handleEdit = (testimonial) => {
        console.log('Editing testimonial:', testimonial);
        setFormData({
            name: testimonial.name || '',
            position: testimonial.position || '',
            image: testimonial.image || '',
            feedback: testimonial.feedback || ''
        });
        setEditId(testimonial._id);
        setShowEditModal(true);
    };

    const handleAddNew = () => {
        setFormData({ name: '', position: '', image: '', feedback: '' });
        setEditId('');
        setShowEditModal(true);
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Student Testimonials Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" onClick={handleAddNew} className="mb-4">
                Add New Testimonial
            </Button>

            <h2>Testimonials</h2>
            <div className="testimonial-list">
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial._id} className="testimonial-item">
                        <h4>Testimonial {index + 1}</h4>
                        <p><strong>Name:</strong> {testimonial.name}</p>
                        <p><strong>Position:</strong> {testimonial.position}</p>
                        <img src={testimonial.image} alt={testimonial.name} style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto' }} />
                        <p><strong>Feedback:</strong> {testimonial.feedback}</p>
                        <div className="action-buttons">
                            <button onClick={() => handleEdit(testimonial)} className="btn btn-link"><FaEdit size={20} /></button>
                            <button onClick={() => handleDelete(testimonial._id)} className="btn btn-link text-danger"><FaTrashAlt size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit/Add Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? 'Edit Testimonial' : 'Add Testimonial'}</Modal.Title>
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
                            <Form.Label>Feedback</Form.Label>
                            <textarea
                                className="form-control"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                placeholder="Feedback"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="mt-3"
                        >
                            {loading ? 'Saving...' : editId ? 'Update' : 'Add'}
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

export default ContentStudentTestimonial;