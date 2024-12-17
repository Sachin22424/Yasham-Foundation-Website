import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentContact.css'; // Reuse the same CSS as ContentContact
import { Modal, Button } from 'react-bootstrap';

const ContentAbout = () => {
  const [formData, setFormData] = useState({
    description1: '',
    description2: '',
    story: '',
  });

  const [id, setId] = useState(''); // ID for updating
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state for validation
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/about';
  const localUrl = 'http://localhost:5000/api/about';

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      let response;
      try {
        response = await axios.get(deployedUrl);
      } catch (error) {
        console.warn('Deployed URL failed, falling back to local URL.');
        response = await axios.get(localUrl);
      }
      const fetchedData = response.data;
      setFormData({
        description1: fetchedData.description1,
        description2: fetchedData.description2,
        story: fetchedData.story,
      });
      setId(fetchedData._id); // Save the fetched document's ID
      setLoading(false);
    } catch (error) {
      console.error('Error fetching about content:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  useEffect(() => {
    document.body.classList.add('contentcontact-background');
    return () => {
      document.body.classList.remove('contentcontact-background');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description1 || !formData.description2 || !formData.story) {
      setError('All fields are required.');
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);
      let url = `${deployedUrl}/${id}`;
      try {
        await axios.put(url, formData);
      } catch (error) {
        console.warn('Deployed URL failed, falling back to local URL.');
        url = `${localUrl}/${id}`;
        await axios.put(url, formData);
      }
      alert('About content updated successfully!');
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error updating about content:', error);
      setLoading(false);
    }
  };

  return (
    <div className="containercontent mt-5">
      <h1 className="headcontent mb-5 text-center">About Content</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h2>About Description 1</h2>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            placeholder="Description 1"
          />
        </div>

        <h2>About Description 2</h2>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            placeholder="Description 2"
          />
        </div>

        <h2>Story</h2>
        <div className="form-group">
          <textarea
            className="form-control"
            name="story"
            value={formData.story}
            onChange={handleChange}
            placeholder="Story"
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
            fontSize: '16px',
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

export default ContentAbout;