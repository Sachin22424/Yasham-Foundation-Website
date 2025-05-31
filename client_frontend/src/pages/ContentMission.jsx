import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentMission.css'; // Ensure the path is correct
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap Modal

const ContentMission = () => {
    const [formData, setFormData] = useState({
        titlemission1: '',
        titlemission2: '',
        missiondescription1: '',
        missiondescription2: '',
        missionurl: ''
    });

    const [id, setId] = useState(''); // ID for updating
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // Error state for validation
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const fetchMissionContent = async () => {
        try {
            setLoading(true);
            const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/about`;
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
                titlemission1: fetchedData.titlemission1,
                titlemission2: fetchedData.titlemission2,
                missiondescription1: fetchedData.mission.missiondescription1,
                missiondescription2: fetchedData.mission.missiondescription2,
                missionurl: fetchedData.mission.missionurl
            });
            setId(fetchedData._id); // Save the fetched document's ID
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data from deployed URL, trying local URL:', error);
            try {
                const response = await axios.get('http://localhost:5000/api/about');
                const fetchedData = response.data;

                setFormData({
                    titlemission1: fetchedData.titlemission1,
                    titlemission2: fetchedData.titlemission2,
                    missiondescription1: fetchedData.mission.missiondescription1,
                    missiondescription2: fetchedData.mission.missiondescription2,
                    missionurl: fetchedData.mission.missionurl
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
        fetchMissionContent();
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
        if (
            !formData.titlemission1 ||
            !formData.titlemission2 ||
            !formData.missiondescription1 ||
            !formData.missiondescription2 ||
            !formData.missionurl
        ) {
            setError('All fields are required.');
            setShowModal(true); // Show the modal
            return;
        }

        try {
            setLoading(true);
            const updatedData = {
                titlemission1: formData.titlemission1,
                titlemission2: formData.titlemission2,
                mission: {
                    missiondescription1: formData.missiondescription1,
                    missiondescription2: formData.missiondescription2,
                    missionurl: formData.missionurl
                }
            };
            const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/about/${id}`;
            const localUrl = `http://localhost:5000/api/about/${id}`;
            try {
                await axios.put(deployedUrl, updatedData);
            } catch (error) {
                console.warn('Deployed URL failed, falling back to local URL.');
                await axios.put(localUrl, updatedData);
            }
            alert('Mission content updated successfully!');
            setLoading(false);
            setError(''); // Clear error message on successful submission
        } catch (error) {
            console.error('Error updating content:', error);
            setLoading(false);
        }
    };

    return (
        <div className="containercontent mt-5">
            <h1 className="headcontent mb-5 text-center">Mission Content</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <h2>Text Content</h2>
                <h4 style = {{marginTop: '20px'}}>Title Mission 1</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="titlemission1"
                        value={formData.titlemission1}
                        onChange={handleChange}
                        placeholder="Title Mission 1"
                    />
                </div>

                <h4>Title Mission 2</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="titlemission2"
                        value={formData.titlemission2}
                        onChange={handleChange}
                        placeholder="Title Mission 2"
                    />
                </div>

                <h4>Mission Description 1</h4>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        name="missiondescription1"
                        value={formData.missiondescription1}
                        onChange={handleChange}
                        placeholder="Mission Description 1"
                    />
                </div>

                <h4>Mission Description 2</h4>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        name="missiondescription2"
                        value={formData.missiondescription2}
                        onChange={handleChange}
                        placeholder="Mission Description 2"
                    />
                </div>

                <h2>Video Url</h2>
                <h4 style = {{marginTop: '20px'}}>Mission Youtube URL</h4>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="missionurl"
                        value={formData.missionurl}
                        onChange={handleChange}
                        placeholder="Mission URL"
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

export default ContentMission;