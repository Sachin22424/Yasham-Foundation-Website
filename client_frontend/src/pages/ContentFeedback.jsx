import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentFeedback.css'; // Import custom CSS
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const ContentFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);

    // ...existing code...
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website.onrender.com/api/feedback');
                setFeedbacks(response.data.slice(0, 5)); // Show only the top 5 newest feedbacks
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        const fetchContactInfo = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website.onrender.com/api/contact');
                setFeedbackTitle(response.data.feedbacktitle);
                setFeedbackMessage(response.data.feedbackmessage);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchFeedbacks();
        fetchContactInfo();
    }, []);
// ...existing code...

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!feedbackTitle || !feedbackMessage) {
            setError('All fields are required.');
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.put('https://yasham-foundation-website.onrender.com/api/contact', {
                feedbacktitle: feedbackTitle,
                feedbackmessage: feedbackMessage
            });
            if (response.status === 200) {
                setSuccess('Feedback title and message updated successfully!');
                setError('');
            }
        } catch (error) {
            setError('Failed to update feedback title and message. Please try again later.');
            setSuccess('');
        }
    };

    const handleExport = async () => {
        try {
            const response = await axios.get('https://yasham-foundation-website.onrender.com/api/feedback/export', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'feedbacks.xlsx');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting feedbacks:', error);
        }
    };
// ...existing code...

    return (
        <div className="contentfeedback-wrapper">
            <div className="containercontent mt-5">
                <h1 className="headcontent mb-5 text-center">Feedback Greeting</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit} className="mb-5">
                    <h2>Greeting Title</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="feedbackTitle"
                            value={feedbackTitle}
                            onChange={(e) => setFeedbackTitle(e.target.value)}
                            placeholder="Feedback Title"
                        />
                    </div>
                    <h2>Greeting Message</h2>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="feedbackMessage"
                            rows="3"
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                            placeholder="Feedback Message"
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
                <h1 className="headcontent mb-5 text-center">Feedbacks</h1>
                {feedbacks.length > 0 ? (
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
                                    <th scope="col">Name</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback, index) => (
                                    <tr key={feedback._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{feedback.name || 'Anonymous'}</td>
                                        <td>{feedback.subject}</td>
                                        <td>{feedback.message}</td>
                                        <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No feedbacks available.</p>
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

export default ContentFeedback;