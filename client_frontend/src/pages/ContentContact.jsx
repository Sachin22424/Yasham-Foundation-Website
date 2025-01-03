import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentContact.css'; // Import custom CSS
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const ContentContact = () => {
  const [formData, setFormData] = useState({
    mail: '',
    number: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    getInTouchHeading: '',
    followUsHeading: ''
  });

  const [id, setId] = useState(''); // ID for updating
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state for validation
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const fetchContactContent = async () => {
    try {
      setLoading(true);
      const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/contact';
      const localUrl = 'http://localhost:5000/api/contact';
      const response = await axios.get(deployedUrl);
      const fetchedData = response.data;

      setFormData(fetchedData);
      setId(fetchedData._id); // Save the fetched document's ID
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from deployed URL, trying local URL:', error);
      try {
        const response = await axios.get('http://localhost:5000/api/contact');
        const fetchedData = response.data;

        setFormData(fetchedData);
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
    fetchContactContent();
  }, []);

  useEffect(() => {
    // Add the class to the body element
    document.body.classList.add('contentcontact-background');

    // Remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('contentcontact-background');
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
      !formData.mail ||
      !formData.number ||
      !formData.linkedin ||
      !formData.facebook ||
      !formData.instagram ||
      !formData.getInTouchHeading ||
      !formData.followUsHeading
    ) {
      setError('All fields are required.');
      setShowModal(true); // Show the modal
      return;
    }

    try {
      setLoading(true);
      const url = `https://yasham-foundation-website.onrender.com/api/contact/${id}` || `http://localhost:5000/api/contact/${id}`;
      await axios.put(url, formData);
      alert('Contact content updated successfully!');
      setLoading(false);
      setError(''); // Clear error message on successful submission
    } catch (error) {
      console.error('Error updating content:', error);
      setLoading(false);
    }
  };

  return (
    <div className="containercontent mt-5">
      <h1 className="headcontent mb-5 text-center">Contact Content</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h2>Email</h2>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <h2>Phone Number</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <h2>LinkedIn</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
          />
        </div>

        <h2>Facebook</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="Facebook URL"
          />
        </div>

        <h2>Instagram</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram URL"
          />
        </div>

        <h2>Heading 1</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="getInTouchHeading"
            value={formData.getInTouchHeading}
            onChange={handleChange}
            placeholder="Get In Touch Heading"
          />
        </div>

        <h2>Heading 2</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="followUsHeading"
            value={formData.followUsHeading}
            onChange={handleChange}
            placeholder="Follow Us Heading"
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

export default ContentContact;