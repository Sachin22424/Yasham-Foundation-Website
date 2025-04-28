import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentSupport.css'; // Ensure the path is correct
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap Modal

const ContentSupport = () => {
    const [formData, setFormData] = useState({
        donateTitle: '',
        donatePoint1: '',
        donatePoint2: '',
        donatePoint3: '',
        volunteerTitle: '',
        volunteerPoint1: '',
        volunteerPoint2: '',
        volunteerPoint3: '',
        volunteerPoint4: ''
    });

    const [id, setId] = useState(''); // ID for updating
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Error state for validation
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const fetchSupportContent = async () => {
        try {
            setLoading(true);
            const deployedUrl = 'https://yasham-foundation-website-production.up.railway.app/api/about';
            const localUrl = 'http://localhost:5000/api/about';
            let response;
            try {
                response = await axios.get(deployedUrl);
            } catch (error) {
                console.warn('Deployed URL failed, falling back to local URL.');
                response = await axios.get(localUrl);
            }
            const fetchedData = response.data;

            setFormData({
                donateTitle: fetchedData.donate.title,
                donatePoint1: fetchedData.donate.point1,
                donatePoint2: fetchedData.donate.point2,
                donatePoint3: fetchedData.donate.point3,
                volunteerTitle: fetchedData.volunteer.title,
                volunteerPoint1: fetchedData.volunteer.point1,
                volunteerPoint2: fetchedData.volunteer.point2,
                volunteerPoint3: fetchedData.volunteer.point3,
                volunteerPoint4: fetchedData.volunteer.point4
            });
            setId(fetchedData._id); // Save the fetched document's ID
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data from deployed URL, trying local URL:', error);
            try {
                const response = await axios.get('http://localhost:5000/api/about');
                const fetchedData = response.data;

                setFormData({
                    donateTitle: fetchedData.donate.title,
                    donatePoint1: fetchedData.donate.point1,
                    donatePoint2: fetchedData.donate.point2,
                    donatePoint3: fetchedData.donate.point3,
                    volunteerTitle: fetchedData.volunteer.title,
                    volunteerPoint1: fetchedData.volunteer.point1,
                    volunteerPoint2: fetchedData.volunteer.point2,
                    volunteerPoint3: fetchedData.volunteer.point3,
                    volunteerPoint4: fetchedData.volunteer.point4
                });
                setId(fetchedData._id); // Save the fetched document's ID
                setLoading(false);
            } catch (localError) {
                console.error('Error fetching data from local URL:', localError);
                setLoading(false);
            }
        }
    };

    // Fetch existing data
    useEffect(() => {
        fetchSupportContent();
    }, []);

    useEffect(() => {
        // Add the class to the body element
        document.body.classList.add('contentsupport-background');

        // Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('contentsupport-background');
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
        if (
            !formData.donateTitle ||
            !formData.donatePoint1 ||
            !formData.donatePoint2 ||
            !formData.donatePoint3 ||
            !formData.volunteerTitle ||
            !formData.volunteerPoint1 ||
            !formData.volunteerPoint2 ||
            !formData.volunteerPoint3 ||
            !formData.volunteerPoint4
        ) {
            setError('All fields are required.');
            setShowModal(true); // Show the modal
            return;
        }

        try {
            setLoading(true);
            const deployedUrl = `https://yasham-foundation-website.onrender.com/api/about/${id}`;
            const localUrl = `http://localhost:5000/api/about/${id}`;
            try {
                await axios.put(deployedUrl, {
                    donate: {
                        title: formData.donateTitle,
                        point1: formData.donatePoint1,
                        point2: formData.donatePoint2,
                        point3: formData.donatePoint3
                    },
                    volunteer: {
                        title: formData.volunteerTitle,
                        point1: formData.volunteerPoint1,
                        point2: formData.volunteerPoint2,
                        point3: formData.volunteerPoint3,
                        point4: formData.volunteerPoint4
                    }
                });
            } catch (error) {
                console.warn('Deployed URL failed, falling back to local URL.');
                await axios.put(localUrl, {
                    donate: {
                        title: formData.donateTitle,
                        point1: formData.donatePoint1,
                        point2: formData.donatePoint2,
                        point3: formData.donatePoint3
                    },
                    volunteer: {
                        title: formData.volunteerTitle,
                        point1: formData.volunteerPoint1,
                        point2: formData.volunteerPoint2,
                        point3: formData.volunteerPoint3,
                        point4: formData.volunteerPoint4
                    }
                });
            }
            alert('Support content updated successfully!');
            setLoading(false);
            setError(''); // Clear error message on successful submission
        } catch (error) {
            console.error('Error updating content:', error);
            setLoading(false);
        }
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Support Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>

            <h2>Support Page Title</h2>
            <div className="form-group">
    <input
        type="text"
        className="form-control"
        name="volunteerPoint4"
        value={formData.volunteerPoint4}
        onChange={handleChange}
        placeholder="Volunteer Point 4"
    />
</div>

                <h3>Donate Title</h3>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="donateTitle"
                        value={formData.donateTitle}
                        onChange={handleChange}
                        placeholder="Donate Title"
                    />
                </div>

                <h4>Donate Point 1</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="donatePoint1"
                        value={formData.donatePoint1}
                        onChange={handleChange}
                        placeholder="Donate Point 1"
                    />
                </div>

                <h4>Donate Point 2</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="donatePoint2"
                        value={formData.donatePoint2}
                        onChange={handleChange}
                        placeholder="Donate Point 2"
                    />
                </div>

                <h4>Donate Point 3</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="donatePoint3"
                        value={formData.donatePoint3}
                        onChange={handleChange}
                        placeholder="Donate Point 3"
                    />
                </div>

                <h3>Volunteer Title</h3>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="volunteerTitle"
                        value={formData.volunteerTitle}
                        onChange={handleChange}
                        placeholder="Volunteer Title"
                    />
                </div>

                <h4>Volunteer Point 1</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="volunteerPoint1"
                        value={formData.volunteerPoint1}
                        onChange={handleChange}
                        placeholder="Volunteer Point 1"
                    />
                </div>

                <h4>Volunteer Point 2</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="volunteerPoint2"
                        value={formData.volunteerPoint2}
                        onChange={handleChange}
                        placeholder="Volunteer Point 2"
                    />
                </div>

                <h4>Volunteer Point 3</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="volunteerPoint3"
                        value={formData.volunteerPoint3}
                        onChange={handleChange}
                        placeholder="Volunteer Point 3"
                    />
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

            {/* Modal for error message */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>All fields are required.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ContentSupport;