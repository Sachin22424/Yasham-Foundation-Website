import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css'; // Reuse the same CSS as ContentHome
import { Modal, Button, Form } from 'react-bootstrap';

const ContentNews = () => {
    const [formData, setFormData] = useState({
        news: [],
        newNews: { image: { url: '', width: '', height: '' }, heading: '', description: '', buttonText: '', articleUrl: '' }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Error state for validation
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://yasham-foundation-website-production.up.railway.app/api/news');
            setFormData({ news: response.data, newNews: { image: { url: '', width: '', height: '' }, heading: '', description: '', buttonText: '', articleUrl: '' } });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
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
        const updatedNews = [...formData.news];
        if (name.startsWith('image.')) {
            const imageField = name.split('.')[1];
            updatedNews[index].image[imageField] = value;
        } else {
            updatedNews[index][name] = value;
        }
        setFormData({ ...formData, news: updatedNews });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        const { image, heading, description, buttonText, articleUrl } = formData.news[0];
        if (!image.url || !image.width || !image.height || !heading || !description || !buttonText || !articleUrl) {
            setError('All fields are required.');
            setShowModal(true); // Show the modal
            return;
        }

        try {
            setLoading(true);
            await axios.put(`https://yasham-foundation-website.onrender.com/api/news/${formData.news[0]._id}`, formData.news[0]);
            fetchNews();
            setLoading(false);
            setError(''); // Clear error message on successful submission
        } catch (error) {
            console.error('Error updating news:', error);
            setLoading(false);
        }
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">News Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '20px' }}>Image </h2>
                {formData.news.map((newsItem, index) => (
                    <div key={index} className="news-item">

                        <h5 style={{ marginTop: '20px' }}>Image URL</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="image.url"
                                value={newsItem.image.url}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Image URL"
                            />
                        </div>
                        <h5>Image Width</h5>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="image.width"
                                value={newsItem.image.width}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Image Width"
                            />
                        </div>
                        <h5>Image Height</h5>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="image.height"
                                value={newsItem.image.height}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Image Height"
                            />
                        </div>
                        <h3 style={{marginBottom:'20px'}}>Text Content</h3>
                        <h5>Title</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="heading"
                                value={newsItem.heading}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Title"
                            />
                        </div>
                        <h5>Description</h5>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="description"
                                value={newsItem.description}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Description"
                            />
                        </div>
                        <h5>Button Text</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="buttonText"
                                value={newsItem.buttonText}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Button Text"
                            />
                        </div>
                        <h3 style={{marginBottom:'20px'}}>Url Content</h3>
                        <h5>Link to Article</h5>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="articleUrl"
                                value={newsItem.articleUrl}
                                onChange={(e) => handleChange(e, 'news', index)}
                                placeholder="Link to Article"
                            />
                        </div>
                    </div>
                ))}
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

export default ContentNews;