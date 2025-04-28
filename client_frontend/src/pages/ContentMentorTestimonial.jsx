import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css'; // Reuse the same CSS as ContentHome
import { Modal, Button, Form } from 'react-bootstrap';

const ContentMentorTestimonial = () => {
    const [formData, setFormData] = useState({
        testimonials: [],
        newTestimonial: { name: '', position: '', image: '', feedback: '' }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Error state for validation
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://yasham-foundation-website-production.up.railway.app/api/mentor-testimonials');
            setFormData({ testimonials: response.data, newTestimonial: { name: '', position: '', image: '', feedback: '' } });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    useEffect(() => {
        // Add the class to the body element
        document.body.classList.add('contenthome-background');

        // Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('contenthome-background');
        };
    }, []);

    // Handle input change
    const handleChange = (e, field, index) => {
        const { name, value } = e.target;
        if (field === 'testimonials') {
            const updatedTestimonials = [...formData.testimonials];
            updatedTestimonials[index][name] = value;
            setFormData({ ...formData, testimonials: updatedTestimonials });
        } else {
            setFormData({ ...formData, newTestimonial: { ...formData.newTestimonial, [name]: value } });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!formData.newTestimonial.name || !formData.newTestimonial.position || !formData.newTestimonial.image || !formData.newTestimonial.feedback) {
            setError('All fields are required.');
            setShowModal(true); // Show the modal
            return;
        }

        try {
            setLoading(true);
            await axios.post('https://yasham-foundation-website.onrender.com/api/mentor-testimonials', formData.newTestimonial);
            fetchTestimonials();
            setLoading(false);
            setError(''); // Clear error message on successful submission
        } catch (error) {
            console.error('Error adding testimonial:', error);
            setLoading(false);
        }
    };

    // Handle add new testimonial
    const handleAddTestimonial = () => {
        setFormData({
            ...formData,
            testimonials: [...formData.testimonials, formData.newTestimonial],
            newTestimonial: { name: '', position: '', image: '', feedback: '' }
        });
    };

    // Handle remove testimonial
    const handleRemoveTestimonial = async (index) => {
        try {
            setLoading(true);
            const testimonialId = formData.testimonials[index]._id;
            await axios.delete(`https://yasham-foundation-website.onrender.com/api/mentor-testimonials/${testimonialId}`);
            fetchTestimonials();
            setLoading(false);
        } catch (error) {
            console.error('Error removing testimonial:', error);
            setLoading(false);
        }
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Mentor Testimonials Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '20px' }}>Mentor Testimonials</h2>
                {formData.testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        <h4>Testimonial {index + 1}</h4>
                        <h5 style={{ marginTop: '20px' }}>Name</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={testimonial.name}
                                onChange={(e) => handleChange(e, 'testimonials', index)}
                                placeholder="Name"
                            />
                        </div>
                        <h5>Position</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="position"
                                value={testimonial.position}
                                onChange={(e) => handleChange(e, 'testimonials', index)}
                                placeholder="Position"
                            />
                        </div>
                        <h5>Image</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={testimonial.image}
                                onChange={(e) => handleChange(e, 'testimonials', index)}
                                placeholder="Image URL"
                            />
                        </div>
                        <h5>Feedback</h5>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="feedback"
                                value={testimonial.feedback}
                                onChange={(e) => handleChange(e, 'testimonials', index)}
                                placeholder="Feedback"
                            />
                        </div>
                        <Button variant="danger" onClick={() => handleRemoveTestimonial(index)} style={{ marginBottom: '20px' }}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                ))}
                <Button variant="primary" onClick={handleAddTestimonial}>
                    Add Testimonial
                </Button>
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

export default ContentMentorTestimonial;