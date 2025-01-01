import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'; // Import the Card component
import '../assets/studentTestimonial.css'; // Custom CSS for additional styling
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const MentorTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('https://yasham-foundation-website.onrender.com/api/mentor-testimonials');
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching mentor testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="team-section">
            <div className="team-section" style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: '700' }}>Mentor Testimonials</h1>
            </div>
            <Card className="p-3 mb-4" style={{ border: 'none', backgroundColor: '#f9f9f9' }}>
                <div className="mt-4 row justify-content-center text-center testimonials-container">
                    {testimonials.map((testimonial, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card testimonial-card h-100">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <img src={testimonial.image} alt={testimonial.name} className="rounded-circle img-fluid" style={{ width: '50px', height: '52px' }} />
                                    </div>
                                    <i className="fas fa-quote-left testimonial-quote-icon" style={{ marginRight: '200px' }}></i>
                                    <p className="card-text" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{testimonial.feedback}</p>
                                    <p className="card-title" style={{ fontSize: '1rem', marginBottom: '0.1rem' }}>{testimonial.name}</p>
                                    <p className="card-subtitle text-muted" style={{ fontSize: '0.95rem', marginBottom: '0rem' }}>{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default MentorTestimonials;