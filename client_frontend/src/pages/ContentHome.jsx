import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css'; // Import custom CSS

const ContentHome = () => {
  const [formData, setFormData] = useState({
    sliderImages: [],
    story: { title: '', description: '' },
    events: [{ name: '', description: '' }],
    video: { url: '', title: '', description: '' },
    mainevent: { image: '', name: '', description: '' },
    upcomingEvent: { name: '', description: '' },
    newSliderImage: { image: '' }, // Initialize newSliderImage
  });

  const [id, setId] = useState(''); // ID for updating
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state for validation

  // Fetch existing data
  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/home');
        const fetchedData = response.data;

        // Ensure `newSliderImage` is initialized if missing
        if (!fetchedData.newSliderImage) {
          fetchedData.newSliderImage = { image: '' };
        }

        setFormData(fetchedData);
        setId(fetchedData._id); // Save the fetched document's ID
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchHomeContent();
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
  const handleChange = (e, key, index) => {
    const { name, value } = e.target;
    if (key) {
      // For nested objects or arrays
      setFormData((prev) => ({
        ...prev,
        [key]: Array.isArray(prev[key])
          ? prev[key].map((item, i) =>
              i === index ? { ...item, [name]: value } : item
            )
          : { ...prev[key], [name]: value },
      }));
    } else {
      // For top-level fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (
      !formData.newSliderImage.image ||
      !formData.story.description ||
      !formData.mainevent.image ||
      !formData.mainevent.name ||
      !formData.mainevent.description ||
      formData.events.some(event => !event.name) ||
      !formData.upcomingEvent.name ||
      !formData.upcomingEvent.description ||
      !formData.video.url ||
      !formData.video.description
    ) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/home/${id}`, formData);
      alert('Content updated successfully!');
      setLoading(false);
      setError(''); // Clear error message on successful submission
    } catch (error) {
      console.error('Error updating content:', error);
      setLoading(false);
    }
  };

  return (
    <div className="containercontent mt-5">
      <h1 className="headcontent mb-5 text-center">Manage Home Content</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h2>Slider Image Url</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.newSliderImage?.image || ''}
            onChange={(e) => handleChange(e, 'newSliderImage')}
            placeholder="New Slider Image URL"
          />
        </div>

        <h2>Story What We Do</h2>
       
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={formData.story.description}
            onChange={(e) => handleChange(e, 'story')}
            placeholder="Story Description"
          />
        </div>

        <h2>Main Event</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.mainevent.image}
            onChange={(e) => handleChange(e, 'mainevent')}
            placeholder="Main Event Image URL"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.mainevent.name}
            onChange={(e) => handleChange(e, 'mainevent')}
            placeholder="Main Event Name"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={formData.mainevent.description}
            onChange={(e) => handleChange(e, 'mainevent')}
            placeholder="Main Event Description"
          />
        </div>

        <h2>Events List</h2>
        {formData.events.map((event, index) => (
          <div key={index}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={event.name}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Event Name"
              />
            </div>
          </div>
        ))}

        <h2>Upcoming Event</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.upcomingEvent.name}
            onChange={(e) => handleChange(e, 'upcomingEvent')}
            placeholder="Upcoming Event Name"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={formData.upcomingEvent.description}
            onChange={(e) => handleChange(e, 'upcomingEvent')}
            placeholder="Upcoming Event Description"
          />
        </div>

        <h2>Video</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="url"
            value={formData.video.url}
            onChange={(e) => handleChange(e, 'video')}
            placeholder="Video URL"
          />
        </div>
        
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={formData.video.description}
            onChange={(e) => handleChange(e, 'video')}
            placeholder="Video Description"
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
    </div>
  );
};

export default ContentHome;