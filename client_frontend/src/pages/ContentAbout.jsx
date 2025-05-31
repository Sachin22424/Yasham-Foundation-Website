import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentContact.css'; // Reuse the same CSS as ContentContact
import { Modal, Button } from 'react-bootstrap';

const ContentAbout = () => {
  const [formData, setFormData] = useState({
    title1: '',
    title2: '',
    description1: '',
    description2: '',
    story: '',
    image: {
      url: '',
      width: '',
      height: ''
    }
  });

  const [id, setId] = useState(''); // ID for updating
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state for validation
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // ...existing code...
  const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/about`;
  const localUrl = 'http://localhost:5000/api/about';
// ...existing code...

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
        title1: fetchedData.title1,
        title2: fetchedData.title2,
        description1: fetchedData.description1,
        description2: fetchedData.description2,
        story: fetchedData.story,
        image: fetchedData.image
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
    if (name.startsWith('image.')) {
      const imageField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          [imageField]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title1 || !formData.title2 || !formData.description1 || !formData.description2 || !formData.story || !formData.image.url || !formData.image.width || !formData.image.height) {
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
      <h2>About Image</h2>
        <h4 style = {{marginTop: '20px'}}>Image Url</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image.url"
            value={formData.image.url}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <h4>Image Width (use %)</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image.width"
            value={formData.image.width}
            onChange={handleChange}
            placeholder="Image Width"
          />
        </div>
        <h4 >Image Height (use %)</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image.height"
            value={formData.image.height}
            onChange={handleChange}
            placeholder="Image Height"
          />
        </div>

        <h2 style = {{marginBottom: '20px'}}>Text Content</h2>

        <h4>Title 1</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title1"
            value={formData.title1}
            onChange={handleChange}
            placeholder="Title 1"
          />
        </div>

        <h4>About Description 1</h4>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            placeholder="Description 1"
          />
        </div>

        <h4>Title 2</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title2"
            value={formData.title2}
            onChange={handleChange}
            placeholder="Title 2"
          />
        </div>

        <h4>About Description 2</h4>
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