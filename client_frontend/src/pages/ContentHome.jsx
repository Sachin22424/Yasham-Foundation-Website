import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css'; // Import custom CSS
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const ContentHome = () => {
  const [formData, setFormData] = useState({
    sliderImages: [],
    story: { title: [], description: '', button: '', pointer1image: {}, pointer1title: '', pointer1description: '', pointer2image: {}, pointer2title: '', pointer2description: '', pointer3image: {}, pointer3title: '', pointer3description: '', pointer4image: {}, pointer4title: '', pointer4description: '' },
    events: [{ name: '', description: '', imageUrl: '', imageWidth: '', imageHeight: '', videoUrl: '', videoWidth: '', videoHeight: '' }],
    video: { url: '', title: '', description: '' },
    mainevent: [{ image: '', height: '', width: '', name: '', form: '', description: '' }],
    upcomingEvent: { name: '', description: '' },
    newSliderImage: { image: '' },
    newTitleWord: { word: '', color: '' },
    ourImpact: { image: '', height: '', width: '', title1: '', title2: '', description: '' },
    testimonials: [{ name: '', role: '', quote: '' }],
  });

  const [id, setId] = useState(''); // ID for updating
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state for validation
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const fetchHomeContent = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const fetchedData = response.data;

      // Ensure fields are initialized if missing
      if (!fetchedData.newSliderImage) fetchedData.newSliderImage = { image: '' };
      if (!fetchedData.newTitleWord) fetchedData.newTitleWord = { word: '', color: '' };
      if (!fetchedData.ourImpact) fetchedData.ourImpact = { image: '', height: '', width: '', title1: '', title2: '', description: '' };
      if (!fetchedData.testimonials) fetchedData.testimonials = [{ name: '', role: '', quote: '' }];

      setFormData(fetchedData);
      setId(fetchedData._id || ''); // Ensure ID is set
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch content. Please try again.');
      setShowModal(true);
      setLoading(false);
    }
  };

  // Fetch existing data
    useEffect(() => {
    const localUrl = 'http://localhost:5000/api/home';
    const deployedUrl = `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/home`;

    fetchHomeContent(deployedUrl).catch(() => fetchHomeContent(localUrl));
  }, []);

  useEffect(() => {
    document.body.classList.add('contenthome-background');
    return () => document.body.classList.remove('contenthome-background');
  }, []);

  // Handle input change
  const handleChange = (e, key, index) => {
    const { name, value } = e.target;

    if (key) {
      setFormData((prev) => {
        if (Array.isArray(prev[key])) {
          const updatedArray = [...prev[key]];
          updatedArray[index] = { ...updatedArray[index], [name]: value };
          return { ...prev, [key]: updatedArray };
        } else if (key === 'story' && name.includes('pointer')) {
          const updatedStory = { ...prev.story };
          if (name.includes('image.')) {
            const [pointerKey, subKey] = name.split('.');
            const pointerNum = pointerKey.match(/\d+/)[0];
            updatedStory[`pointer${pointerNum}image`] = {
              ...updatedStory[`pointer${pointerNum}image`],
              [subKey]: value,
            };
          } else {
            updatedStory[name] = value;
          }
          return { ...prev, story: updatedStory };
        } else {
          const updatedKey = { ...prev[key], [name]: value };
          return { ...prev, [key]: updatedKey };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, { name: '', description: '', imageUrl: '', imageWidth: '', imageHeight: '', videoUrl: '', videoWidth: '', videoHeight: '' }],
    }));
  };

  // Handle removing an event
  const handleRemoveEvent = (index) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
  };

  // Handle adding a new slider image
  const handleAddSliderImage = () => {
    if (!formData.newSliderImage.image) {
      setError('Slider image URL is required.');
      setShowModal(true);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      sliderImages: [...prev.sliderImages, formData.newSliderImage.image],
      newSliderImage: { image: '' },
    }));
  };

  // Handle removing a slider image
  const handleRemoveSliderImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      sliderImages: prev.sliderImages.filter((_, i) => i !== index),
    }));
  };

  // Handle adding a new title word
  const handleAddTitleWord = () => {
    setFormData((prev) => ({
      ...prev,
      story: {
        ...prev.story,
        title: [...prev.story.title, formData.newTitleWord],
      },
      newTitleWord: { word: '', color: '' },
    }));
  };

  // Handle removing a title word
  const handleRemoveTitleWord = (index) => {
    setFormData((prev) => ({
      ...prev,
      story: {
        ...prev.story,
        title: prev.story.title.filter((_, i) => i !== index),
      },
    }));
  };

  // Handle adding a new testimonial
  const handleAddTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { name: '', role: '', quote: '' }],
    }));
  };

  // Handle removing a testimonial
  // Handle removing a testimonial
  const handleRemoveTestimonial = (index) => {
    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }));
  };

  // Handle adding a new main event
  const handleAddMainEvent = () => {
    setFormData((prev) => ({
      ...prev,
      mainevent: [...prev.mainevent, { image: '', height: '', width: '', name: '', form: '', description: '' }],
    }));
  };

  // Handle removing a main event
  const handleRemoveMainEvent = (index) => {
    setFormData((prev) => ({
      ...prev,
      mainevent: prev.mainevent.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setError('No content ID found. Please ensure content is loaded correctly.');
      setShowModal(true);
      return;
    }

    // Clean up formData to match backend expectations
    const cleanedFormData = { ...formData };
    // Remove temporary fields that shouldn't be sent to the backend
    delete cleanedFormData.newSliderImage;
    delete cleanedFormData.newTitleWord;

    try {
      setLoading(true);
      const baseUrl = process.env.NODE_ENV === 'production'
        ? `${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/home`
        : 'http://localhost:5000';
      const url = `${baseUrl}/api/home/${id}`;

      console.log('Submitting to:', url);
      console.log('Payload:', cleanedFormData);

      const response = await axios.put(url, cleanedFormData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('Content updated successfully!');
        setError('');
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      console.error('Error updating content:', error);
      setError(error.response?.data?.message || 'Failed to update content. Please try again.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containercontent mt-5">
      <h1 className="headcontent mb-5 text-center">Home Content</h1>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        {/* Rest of the form remains unchanged */}
        <h2>Slider Images</h2>
        <ul>
          {formData.sliderImages.map((image, index) => (
            <li key={index}>
              {image}
              <Button variant="danger" onClick={() => handleRemoveSliderImage(index)}>
                <i className="fas fa-trash-alt"></i>
              </Button>
            </li>
          ))}
        </ul>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.newSliderImage.image}
            onChange={(e) => handleChange(e, 'newSliderImage')}
            placeholder="New Slider Image URL"
          />
          <Button variant="primary" onClick={handleAddSliderImage} style={{ marginTop: '20px' }}>
            Add Slider Image
          </Button>
        </div>

        <h2>Heading</h2>
        <ul>
          {formData.story.title.map((title, index) => (
            <li key={index}>
              <span style={{ color: title.color }}>{title.word}</span>
              <Button variant="danger" onClick={() => handleRemoveTitleWord(index)}>
                <i className="fas fa-trash-alt"></i>
              </Button>
            </li>
          ))}
        </ul>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="word"
            value={formData.newTitleWord.word}
            onChange={(e) => handleChange(e, 'newTitleWord')}
            placeholder="New Title Word"
          />
          <h5 style={{ marginTop: '10px' }}>Colour</h5>
          <input
            type="color"
            className="form-control"
            name="color"
            value={formData.newTitleWord.color}
            onChange={(e) => handleChange(e, 'newTitleWord')}
            placeholder="New Title Color"
          />
          <Button variant="primary" onClick={handleAddTitleWord} style={{ marginTop: '20px' }}>
            Add Title Word
          </Button>
        </div>
        <h4>Description</h4>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={formData.story.description}
            onChange={(e) => handleChange(e, 'story')}
            placeholder="Story Description"
          />
        </div>
        <h4>Button</h4>
        <div className="form-group">
          <input
            className="form-control"
            name="button"
            value={formData.story.button}
            onChange={(e) => handleChange(e, 'story')}
            placeholder="Story Button"
          />
        </div>

        {[1, 2, 3, 4].map((num) => (
          <div key={num}>
            <h4 style={{ marginBottom: '20px' }}>Pointer {num}</h4>
            <div className="form-group">
              <h5>Image Url</h5>
              <input
                type="text"
                className="form-control"
                name={`pointer${num}image.url`}
                value={formData.story[`pointer${num}image`]?.url || ''}
                onChange={(e) => handleChange(e, 'story')}
                placeholder={`Pointer ${num} Image URL`}
              />
              <h5>Image Width (use %)</h5>
              <input
                type="text"
                className="form-control"
                name={`pointer${num}image.width`}
                value={formData.story[`pointer${num}image`]?.width || ''}
                onChange={(e) => handleChange(e, 'story')}
                placeholder={`Pointer ${num} Image Width`}
              />
              <h5>Image Height (use %)</h5>
              <input
                type="text"
                className="form-control"
                name={`pointer${num}image.height`}
                value={formData.story[`pointer${num}image`]?.height || ''}
                onChange={(e) => handleChange(e, 'story')}
                placeholder={`Pointer ${num} Image Height`}
              />
            </div>
            <h5> Pointer Title</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name={`pointer${num}title`}
                value={formData.story[`pointer${num}title`] || ''}
                onChange={(e) => handleChange(e, 'story')}
                placeholder={`Pointer ${num} Title`}
              />
            </div>
            <h5> Pointer Description</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                name={`pointer${num}description`}
                value={formData.story[`pointer${num}description`] || ''}
                onChange={(e) => handleChange(e, 'story')}
                placeholder={`Pointer ${num} Description`}
              />
            </div>
         

 </div>
        ))}

        <h2 style={{ marginBottom: '20px' }}>Impact</h2>
        <h4>Image Url</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.ourImpact.image}
            onChange={(e) => handleChange(e, 'ourImpact')}
            placeholder="Our Impact Image URL"
          />
        </div>
        <h4>Image Width (use %)</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="width"
            value={formData.ourImpact.width}
            onChange={(e) => handleChange(e, 'ourImpact')}
            placeholder="Our Impact Image Width"
          />
        </div>
        <h4>Image Height (use %)</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="height"
            value={formData.ourImpact.height}
            onChange={(e) => handleChange(e, 'ourImpact')}
            placeholder="Our Impact Image Height"
          />
        </div>
        <h4>Title 1</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title1"
            value={formData.ourImpact.title1}
            onChange={(e) => handleChange(e, 'ourImpact')}
            placeholder="Our Impact Title 1"
          />
        </div>
        <h4>Title 2</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title2"
            value={formData.ourImpact.title2}
            onChange={(e) => handleChange(e, 'ourImpact')}
            placeholder="Our Impact Title 2"
          />
        </div>
        <h4>Description</h4>
        <div className="form-group">
          <textarea
            className="form-control"
            name="description"
            value={formData.ourImpact.description}
            onChange={(e) => handleChange(e, 'ourImpact')}
            placeholder="Our Impact Description"
          />
        </div>

        <h2 style={{ marginBottom: '20px' }}>Student Testimonials</h2>
        {formData.testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <h4>Testimonial {index + 1}</h4>
            <h5 style={{ marginTop: '20px' }}>Name</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={testimonial.name}
                onChange={(e) => handleChange(e, 'testimonials', index)}
                placeholder="Name"
              />
            </div>
            <h5>Role</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="role"
                value={testimonial.role}
                onChange={(e) => handleChange(e, 'testimonials', index)}
                placeholder="Role"
              />
            </div>
            <h5>Quote</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                name="quote"
                value={testimonial.quote}
                onChange={(e) => handleChange(e, 'testimonials', index)}
                placeholder="Quote"
              />
            </div>
            <Button variant="danger" onClick={() => handleRemoveTestimonial(index)} style={{ marginBottom: '20px' }}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddTestimonial}>
          Add Testimonial
        </Button>

        <h2 style={{ marginBottom: '20px', marginTop: '20px' }}>Initiatives List</h2>
        {formData.events.map((event, index) => (
          <div key={index} className="initiative-item">
            <h4>Initiative {index + 1}</h4>
            <h5 style={{ marginTop: '20px' }}>Name</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={event.name}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Name"
              />
            </div>
            <h5>Description</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                name="description"
                value={event.description}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Description"
              />
            </div>
            <h5>Image URL</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={event.imageUrl}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Image URL"
              />
            </div>
            <h5>Image Width (use %)</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="imageWidth"
                value={event.imageWidth}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Image Width"
              />
            </div>
            <h5>Image Height (use %)</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="imageHeight"
                value={event.imageHeight}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Image Height"
              />
            </div>
            <h5>Video URL</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="videoUrl"
                value={event.videoUrl}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Video URL"
              />
            </div>
            <h5>Video Width (use %)</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="videoWidth"
                value={event.videoWidth}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Video Width"
              />
            </div>
            <h5>Video Height (use %)</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="videoHeight"
                value={event.videoHeight}
                onChange={(e) => handleChange(e, 'events', index)}
                placeholder="Video Height"
              />
            </div>
            <Button variant="danger" onClick={() => handleRemoveEvent(index)} style={{ marginBottom: '20px' }}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddEvent}>
          Add Initiative
        </Button>

        <h2 style={{ marginBottom: '20px', marginTop: '20px' }}>Main Events</h2>
        {formData.mainevent.map((event, index) => (
          <div key={index} className="mainevent-item">
            <h4>Main Event {index + 1}</h4>
            <h5 style={{ marginTop: '20px' }}>Image URL</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="image"
                value={event.image}
                onChange={(e) => handleChange(e, 'mainevent', index)}
                placeholder="Image URL"
              />
            </div>
            <h5>Image Width (use %)</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="width"
                value={event.width}
                onChange={(e) => handleChange(e, 'mainevent', index)}
                placeholder="Image Width"
              />
            </div>
            <h5>Image Height (use %)</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="height"
                value={event.height}
                onChange={(e) => handleChange(e, 'mainevent', index)}
                placeholder="Image Height"
              />
            </div>
            <h5>Name</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={event.name}
                onChange={(e) => handleChange(e, 'mainevent', index)}
                placeholder="Name"
              />
            </div>
            <h5>Form</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="form"
                value={event.form}
                onChange={(e) => handleChange(e, 'mainevent', index)}
                placeholder="Form"
              />
            </div>
            <h5>Description</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                name="description"
                value={event.description}
                onChange={(e) => handleChange(e, 'mainevent', index)}
                placeholder="Description"
              />
            </div>
            <Button variant="danger" onClick={() => handleRemoveMainEvent(index)} style={{ marginBottom: '20px' }}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddMainEvent} style={{ marginBottom: '20px' }}>
          Add Main Event
        </Button>

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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContentHome;