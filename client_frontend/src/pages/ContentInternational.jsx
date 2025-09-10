// ContentInternational.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ContentHome.css';
import { Modal, Button } from 'react-bootstrap';
import NavbarContent from '../components/NavbarContent';
import Footer from '../components/Footer';

const ContentInternational = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [renderFooter, setRenderFooter] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const navs = document.querySelectorAll('nav');
        const target = navs && navs.length > 0 ? navs[0] : null;
        if (target && !target.classList.contains('content-navbar')) {
          target.style.display = 'none';
          target.dataset._hiddenByAdmin = 'true';
        }
      } catch (err) {
        console.warn('Could not hide nav[0]:', err);
      }
    }, 50);

    return () => {
      clearTimeout(t);
      try {
        const navs = document.querySelectorAll('nav');
        const target = navs && navs.length > 0 ? navs[0] : null;
        if (target && target.dataset._hiddenByAdmin === 'true') {
          target.style.display = '';
          delete target.dataset._hiddenByAdmin;
        }
      } catch (err) {}
    };
  }, []);

  useEffect(() => {
    try {
      const existingFooter = document.querySelector('footer');
      setRenderFooter(!Boolean(existingFooter));
    } catch (err) {
      setRenderFooter(true);
    }
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/international`);
      const data = Array.isArray(response.data) ? response.data : [];
      const normalized = data.map(p => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : [],
        newImage: { url: '', caption: '' }
      }));
      setPrograms(normalized);
    } catch (err) {
      console.error('Error fetching international data:', err);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleFieldChange = (index, name, value) => {
    setPrograms(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const handleNewImageChange = (index, name, value) => {
    setPrograms(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], newImage: { ...copy[index].newImage, [name]: value } };
      return copy;
    });
  };

  const handleAddImage = (index) => {
    if (index === 0) return;
    setPrograms(prev => {
      const copy = [...prev];
      const prog = copy[index];
      const ni = prog.newImage || { url: '', caption: '' };
      if (!ni.url) return prev;
      const images = Array.isArray(prog.images) ? [...prog.images, ni] : [ni];
      copy[index] = { ...prog, images, newImage: { url: '', caption: '' } };
      return copy;
    });
  };

  const handleRemoveImage = (index, imgIndex) => {
    setPrograms(prev => {
      const copy = [...prev];
      const prog = copy[index];
      const images = Array.isArray(prog.images) ? prog.images.filter((_, i) => i !== imgIndex) : [];
      copy[index] = { ...prog, images };
      return copy;
    });
  };

  const handleSubmitProgram = async (index) => {
    const prog = programs[index];
    if (!prog) return;
    if (!prog.title || !prog.description) {
      setError('Title and description are required for each program.');
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);
      if (prog._id) {
        await axios.put(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/international/${prog._id}`, {
          title: prog.title,
          description: prog.description,
          images: prog.images
        });
      } else {
        await axios.post(`${import.meta.env.VITE_REACT_APP_DEPLOYED_URL}/international`, {
          title: prog.title,
          description: prog.description,
          images: prog.images
        });
      }
      await fetchPrograms();
    } catch (err) {
      console.error('Error updating program:', err);
      setError('Failed to update program');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading && programs.length === 0) {
    return (
      <>
        <NavbarContent />
        <div className="containercontent mt-5">
          <p style={{ textAlign: 'center' }}>Loading...</p>
        </div>
        {renderFooter && <Footer />}
      </>
    );
  }

  return (
    <>
      <NavbarContent />
      <div className="containercontent mt-5">
        <h1 className="headcontent mb-5 text-center">
          {programs[0]?.title || 'Yasham International Program'}
        </h1>

        {programs.length === 0 && !loading && <div className="alert alert-info">No programs found.</div>}

        {programs.map((program, idx) => (
          <div key={program._id || idx} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">{idx === 0 ? 'Main Heading' : `Program ${idx + 1}`}</h4>

              <div className="form-group mb-2">
                <label className="small">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={program.title || ''}
                  onChange={(e) => handleFieldChange(idx, 'title', e.target.value)}
                  placeholder="Title"
                />
              </div>

              <div className="form-group mb-3">
                <label className="small">Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={program.description || ''}
                  onChange={(e) => handleFieldChange(idx, 'description', e.target.value)}
                  placeholder="Description"
                />
              </div>

              {/* Images: hide edit for program 1 but show previews */}
              {program.images && program.images.length > 0 && (
                <>
                  <h6>Images</h6>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {program.images.map((img, i) => (
                      <li key={img._id || i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {img.url} {img.caption ? `— ${img.caption}` : ''}
                        </div>
                        <Button
                          variant="info"
                          size="sm"
                          style={{ marginRight: 4 }}
                          onClick={() => window.open(img.url, '_blank')}
                        >
                          Preview
                        </Button>
                        {idx !== 0 && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to remove this image?')) {
                                handleRemoveImage(idx, i);
                              }
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {idx !== 0 && (
                <div className="form-row" style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Image URL"
                    value={(program.newImage && program.newImage.url) || ''}
                    onChange={(e) => handleNewImageChange(idx, 'url', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Caption"
                    value={(program.newImage && program.newImage.caption) || ''}
                    onChange={(e) => handleNewImageChange(idx, 'caption', e.target.value)}
                  />
                  {program.newImage?.url && (
                    <img
                      src={program.newImage.url}
                      alt="Preview"
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                    />
                  )}
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (!program.newImage.url) {
                        alert('URL is required!');
                        return;
                      }
                      handleAddImage(idx);
                    }}
                  >
                    Add Image
                  </Button>
                </div>
              )}
<div style={{ marginTop: 12 }}>
  <Button
    style={{
      backgroundColor: '#6f42c1', // Bootstrap purple
      borderColor: '#6f42c1',
      fontWeight: 'bold'
    }}
    size="sm"
    onClick={() => handleSubmitProgram(idx)}
    disabled={loading}
  >
    {loading ? 'Saving...' : 'Update'}
  </Button>
</div>
            </div>
          </div>
        ))}

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

      {renderFooter && <Footer />}
    </>
  );
};

export default ContentInternational;
