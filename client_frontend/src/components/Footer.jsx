import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Footer.css';
import insta from '../assets/img_instagram.svg';
import fb from '../assets/fb.png';
import linkedin from '../assets/linkedin.png';
import mail from '../assets/img_email_white_a700.svg';
import call from '../assets/img_call.svg';

function Footer() {
    const [contactInfo, setContactInfo] = useState({
        mail: '',
        number: '',
        linkedin: '',
        facebook: '',
        instagram: ''
    });

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const deployedUrl = 'https://yasham-foundation-website.onrender.com/api/contact';
                const localUrl = 'http://localhost:5000/api/contact';
                const response = await axios.get(deployedUrl);
                setContactInfo(response.data);
            } catch (error) {
                console.error('Error fetching contact info from deployed URL, trying local URL:', error);
                try {
                    const response = await axios.get('http://localhost:5000/api/contact');
                    setContactInfo(response.data);
                } catch (localError) {
                    console.error('Error fetching contact info from local URL:', localError);
                }
            }
        };

        fetchContactInfo();
    }, []);

    return (
        <footer className="footer mt-auto py-3 bg-custom text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h4 className="d-flex justify-content-center">Contacts</h4>
                        <div className="d-flex justify-content-center">
                            <a href={`tel:${contactInfo.number}`} className="d-flex align-items-center text-decoration-none" style={{ color: 'white' }}>
                                <img src={call} alt="phone icon" className="mr-2" />
                                <p className="mb-0 mx-2">{contactInfo.number}</p>
                            </a>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <a href={`mailto:${contactInfo.mail}`} className="d-flex align-items-center text-decoration-none" style={{ color: 'white' }}>
                                <img src={mail} alt="email icon" className="mr-2" />
                                <p className="mb-0 mx-2">{contactInfo.mail}</p>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h4>Social Media</h4>
                        <div className="d-flex justify-content-center">
                            <a href={contactInfo.instagram} target="_blank" className="mr-3 mx-2">
                                <img src={insta} alt="instagram icon" className="footer-icon" />
                            </a>
                            <a href={contactInfo.facebook} target="_blank" className="mr-3 mx-2">
                                <img src={fb} alt="facebook icon" className="footer-icon" />
                            </a>
                            <a href={contactInfo.linkedin} target="_blank" className="mr-3 mx-3">
                                <img src={linkedin} alt="linkedin icon" className="footer-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4>Navigation Links</h4>
                        <ul className="list-unstyled">
                            <li><a href="/" className="nav-link">Home</a></li>
                            <li><a href="/contact" className="nav-link">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;