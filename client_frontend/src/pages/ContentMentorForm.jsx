import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentFeedback.css'; // Import custom CSS
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const ContentMentorForm = () => {
    const [mentors, setMentors] = useState([]);
    const [greetingTitle, setGreetingTitle] = useState('');
    const [greetingDescription, setGreetingDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
    const fetchMentors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/mentors`);
            setMentors(response.data.slice(0, 5)); // Get the most recent 5 mentor applications
        } catch (error) {
            console.error('Error fetching mentors:', error);
        }
    };

    const fetchContactInfo = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/contact`);
            setGreetingTitle(response.data.mentorFormModalTitle);
            setGreetingDescription(response.data.mentorFormModalBody);
        } catch (error) {
            console.error('Error fetching contact info:', error);
        }
    };

    fetchMentors();
    fetchContactInfo();
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!greetingTitle || !greetingDescription) {
            setError('All fields are required.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.put(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/contact`, {
                mentorFormModalTitle: greetingTitle,
                mentorFormModalBody: greetingDescription
            });
            if (response.status === 200) {
                setSuccess('Greeting title and description updated successfully!');
                setError('');
            }
        } catch (error) {
            setError('Failed to update greeting title and description. Please try again later.');
            setSuccess('');
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/mentors/export`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'mentors.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting mentors:', error);
        }
    };

    return (
        <div className="contentfeedback-wrapper">
            <div className="containercontent mt-5">
                <h1 className="headcontent mb-5 text-center">Mentor Form Greeting</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit} className="mb-5">
                    <h2>Greeting Title</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="greetingTitle"
                            value={greetingTitle}
                            onChange={(e) => setGreetingTitle(e.target.value)}
                            placeholder="Greeting Title"
                        />
                    </div>
                    <h2>Greeting Description</h2>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="greetingDescription"
                            rows="3"
                            value={greetingDescription}
                            onChange={(e) => setGreetingDescription(e.target.value)}
                            placeholder="Greeting Description"
                        ></textarea>
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
                    >
                        Update
                    </button>
                </form>
                <h1 className="headcontent mb-5 text-center">Mentor Applications</h1>
                {mentors.length > 0 ? (
                    <div>
                        <button
                            onClick={handleExport}
                            className="btn btn-secondary btn-sm mb-5"
                            style={{
                                backgroundColor: '#662d91',
                                borderColor: '#662d91',
                                width: '15%',
                                padding: '10px',
                                fontSize: '16px'
                            }}
                        >
                            Excel Export
                        </button>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">S.no.</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Subjects</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mentors.map((mentor, index) => (
                                    <tr key={mentor._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{mentor.fullName}</td>
                                        <td>{mentor.email}</td>
                                        <td>{mentor.phone}</td>
                                        <td>{mentor.location}</td>
                                        <td>{mentor.subjects}</td>
                                        <td>{new Date(mentor.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No mentor applications available.</p>
                )}

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
        </div>
    );
};

export default ContentMentorForm;