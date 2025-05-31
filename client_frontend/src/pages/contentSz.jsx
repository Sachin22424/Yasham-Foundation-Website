import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css'; // Reuse the same CSS as ContentHome
import { Modal, Button, Form } from 'react-bootstrap';

const ContentSz = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [],
        newImage: { url: '', caption: '' }
    });
    const [id, setId] = useState(''); // ID for updating
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Error state for validation
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const fetchSzData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/sz`);
            const data = response.data[0]; // Assuming the API returns an array and we need the first item
            setFormData({
                title: data.title || '',
                description: data.description || '',
                images: data.images || [],
                newImage: { url: '', caption: '' }
            });
            setId(data._id); // Set the ID for updating
            setLoading(false);
        } catch (error) {
            console.error('Error fetching SZ data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSzData();
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
    const handleChange = (e, field) => {
        const { name, value } = e.target;
        if (field) {
            setFormData({ ...formData, [field]: { ...formData[field], [name]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!formData.title || !formData.description || formData.images.length === 0) {
            setError('All fields are required.');
            setShowModal(true); // Show the modal
            return;
        }

        try {
            setLoading(true);
            if (id) {
                // Update existing SZ entry
                await axios.put(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/sz/${id}`, formData);
            } else {
                // Add new SZ entry
                await axios.post(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/sz`, formData);
            }
            fetchSzData();
            setFormData({ title: '', description: '', images: [], newImage: { url: '', caption: '' } });
            setId('');
            setLoading(false);
            setError(''); // Clear error message on successful submission
        } catch (error) {
            console.error('Error updating content:', error);
            setLoading(false);
        }
    };

    // Handle add new image
    const handleAddImage = () => {
        setFormData({
            ...formData,
            images: [...formData.images, formData.newImage],
            newImage: { url: '', caption: '' }
        });
    };

    // Handle remove image
    const handleRemoveImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Work Page 3</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h2>Text Content</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
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
                <h2>Images</h2>
                <ul>
                    {formData.images.map((image, index) => (
                        <li key={index}>
                            {image.url} - {image.caption}
                            <Button variant="danger" onClick={() => handleRemoveImage(index)} style={{ marginLeft: '10px' }}>
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </li>
                    ))}
                </ul>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="url"
                        value={formData.newImage.url}
                        onChange={(e) => handleChange(e, 'newImage')}
                        placeholder="New Image URL"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="caption"
                        value={formData.newImage.caption}
                        onChange={(e) => handleChange(e, 'newImage')}
                        placeholder="New Image Caption"
                    />
                </div>
                <Button variant="primary" onClick={handleAddImage} style={{ marginTop: '5px', marginBottom: '20px' }}>
                    Add Image
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

export default ContentSz;